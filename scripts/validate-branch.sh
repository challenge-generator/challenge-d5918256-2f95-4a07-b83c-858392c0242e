#!/bin/bash

set -euo pipefail

readonly RESET="\033[0m"
readonly BOLD="\033[1m"
readonly GREEN="\033[32m"
readonly YELLOW="\033[33m"
readonly RED="\033[31m"
readonly BLUE="\033[34m"
readonly CYAN="\033[36m"
readonly MAGENTA="\033[35m"

readonly VALID_BRANCH_TYPES=("feature" "hotfix" "release" "bugfix" "support")
readonly MAIN_BRANCH="main"
readonly DEVELOP_BRANCH="develop"
readonly VALID_MAIN_BRANCHES=("$MAIN_BRANCH" "$DEVELOP_BRANCH")

ERRORS=0
WARNINGS=0

function print_header() {
    echo -e "${BOLD}${BLUE}========================================${RESET}"
    echo -e "${BOLD}${BLUE}  Branch Validation Tool${RESET}"
    echo -e "${BOLD}${BLUE}  Version 2.0.0${RESET}"
    echo -e "${BOLD}${BLUE}========================================${RESET}"
    echo ""
}

function print_success() {
    echo -e "${GREEN}✓${RESET} $1"
}

function print_warning() {
    echo -e "${YELLOW}⚠${RESET} $1"
    ((WARNINGS++))
}

function print_error() {
    echo -e "${RED}✗${RESET} $1"
    ((ERRORS++))
}

function print_info() {
    echo -e "${CYAN}ℹ${RESET} $1"
}

function print_section() {
    echo -e "\n${BOLD}${MAGENTA}━━━ $1 ━━━${RESET}"
}

function check_git_repository() {
    print_section "Verificando repositorio"
    
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "No se encuentra en un repositorio Git"
        exit 1
    fi
    
    local repo_root
    repo_root=$(git rev-parse --show-toplevel)
    print_success "Repositorio: $repo_root"
    print_success "Rama actual: $(git symbolic-ref --short HEAD)"
}

function validate_branch_name_format() {
    print_section "Validando nombre de rama"
    
    local branch_name
    branch_name=$(git symbolic-ref --short HEAD 2>/dev/null || git rev-parse --short HEAD)
    
    echo "Rama a validar: ${BOLD}$branch_name${RESET}"
    
    local name_pattern="^[a-z0-9][a-z0-9-]*$"
    if ! [[ "$branch_name" =~ $name_pattern ]]; then
        print_error "El nombre contiene caracteres inválidos"
        print_info "Solo se permiten letras minúsculas, números y guiones"
        print_info "No debe empezar con guión"
        return 1
    fi
    print_success "Formato de nombre válido"
    
    local feature_pattern="^(feature|hotfix|release|bugfix|support)\\/[A-Z]+-[0-9]+(-[a-z0-9]+)*$"
    local main_pattern="^(main|master|develop|develop-legacy)$"
    local release_pattern="^release\\/[0-9]+\\.[0-9]+\\.?[0-9]*$"
    local version_pattern="^v[0-9]+\\.[0-9]+\\.[0-9]+$"
    
    if [[ "$branch_name" =~ $feature_pattern ]]; then
        print_success "Rama de tipo: Feature/Hotfix/Bugfix/Support"
        validate_feature_branch "$branch_name"
    elif [[ "$branch_name" =~ $main_pattern ]]; then
        print_success "Rama de tipo: Principal (main/develop)"
    elif [[ "$branch_name" =~ $release_pattern ]]; then
        print_success "Rama de tipo: Release"
        validate_release_branch "$branch_name"
    elif [[ "$branch_name" =~ $version_pattern ]]; then
        print_success "Rama de tipo: Tag/Version"
    else
        print_warning "El nombre no coincide con ninguna convención conocida"
        print_info " Patrón esperado: tipo/TICKET-descripcion"
    fi
}

function validate_feature_branch() {
    local branch_name="$1"
    
    local type
    type=$(echo "$branch_name" | cut -d'/' -f1)
    local ticket
    ticket=$(echo "$branch_name" | cut -d'/' -f2 | cut -d'-' -f1-2)
    local description
    description=$(echo "$branch_name" | cut -d'/' -f2 | cut -d'-' -f3-)
    
    echo "  Tipo: $type"
    echo "  Ticket: $ticket"
    echo "  Descripción: $description"
    
    local valid_types=("feature" "hotfix" "bugfix" "support")
    local type_valid=false
    for t in "${valid_types[@]}"; do
        if [ "$type" = "$t" ]; then
            type_valid=true
            break
        fi
    done
    
    if [ "$type_valid" = false ]; then
        print_error "Tipo de rama inválido: $type"
        print_info "Tipos válidos: feature, hotfix, bugfix, support"
    fi
    
    if ! [[ "$ticket" =~ ^[A-Z]+-[0-9]+$ ]]; then
        print_error "Formato de ticket inválido: $ticket"
        print_info "Formato esperado: PROJ-123"
    fi
    
    if [ -z "$description" ]; then
        print_warning "La descripción está vacía"
    elif [ ${#description} -lt 3 ]; then
        print_warning "La descripción es muy corta (mínimo 3 caracteres)"
    elif [ ${#description} -gt 50 ]; then
        print_warning "La descripción es muy larga (máximo 50 caracteres)"
    fi
}

function validate_release_branch() {
    local branch_name="$1"
    
    local version
    version=$(echo "$branch_name" | cut -d'/' -f2)
    
    echo "  Versión: $version"
    
    if ! [[ "$version" =~ ^[0-9]+\\.[0-9]+(\\.[0-9]+)?$ ]]; then
        print_error "Formato de versión inválido: $version"
        print_info "Formato esperado: 1.0.0 o 1.0"
    fi
}

function validate_branch_upstream() {
    print_section "Validando relación con rama upstream"
    
    local current_branch
    current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
    
    if [ -z "$current_branch" ]; then
        print_warning "HEAD desconectado (commit específico)"
        return 0
    fi
    
    local upstream_branch
    upstream_branch=$(git rev-parse --abbrev-ref "${current_branch}@{upstream}" 2>/dev/null || echo "")
    
    if [ -z "$upstream_branch" ]; then
        print_warning "La rama no tiene upstream configurado"
        print_info "Ejecute: git branch --set-upstream-to=origin/branch"
    else
        print_success "Upstream: $upstream_branch"
        
        local commits_ahead
        commits_ahead=$(git rev-list --count "${upstream_branch}..${current_branch}" 2>/dev/null || echo "0")
        local commits_behind
        commits_behind=$(git rev-list --count "${current_branch}..${upstream_branch}" 2>/dev/null || echo "0")
        
        echo "  Commits adelante: $commits_ahead"
        echo "  Commits detrás: $commits_behind"
        
        if [ "$commits_behind" -gt 0 ]; then
            print_warning "La rama está $commits_behind commits detrás del upstream"
            print_info "Considere hacer rebase: git rebase $upstream_branch"
        fi
        
        if [ "$commits_ahead" -gt 0 ]; then
            print_info "La rama tiene $commits_ahead commits locales sin pushear"
        fi
    fi
}

function validate_commit_history() {
    print_section "Validando historial de commits"
    
    local current_branch
    current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
    
    if [ -z "$current_branch" ]; then
        print_warning "No se puede validar historial en HEAD desconectado"
        return 0
    fi
    
    local main_branch="main"
    local develop_branch="develop"
    
    local merge_base
    merge_base=$(git merge-base "$current_branch" "origin/$main_branch" 2>/dev/null || echo "")
    
    if [ -z "$merge_base" ]; then
        merge_base=$(git merge-base "$current_branch" "origin/$develop_branch" 2>/dev/null || echo "")
    fi
    
    if [ -z "$merge_base" ]; then
        print_warning "No se encontró base común con ramas principales"
        return 0
    fi
    
    local commits_count
    commits_count=$(git rev-list --count "$merge_base..$current_branch")
    
    echo "Commits desde la base: $commits_count"
    
    if [ "$commits_count" -eq 0 ]; then
        print_warning "No hay commits en esta rama"
    elif [ "$commits_count" -gt 20 ]; then
        print_warning "La rama tiene $commits_count commits"
        print_info "Considere hacer squash o rebase interactivo"
    else
        print_success "Cantidad de commits apropiada"
    fi
    
    local last_commit
    last_commit=$(git log -1 --pretty=format:"%H %s" "$current_branch")
    local commit_hash commit_message
    commit_hash=$(echo "$last_commit" | cut -d' ' -f1)
    commit_message=$(echo "$last_commit" | cut -d' ' -f2-)
    
    echo ""
    echo "  Último commit: ${commit_hash:0:7}"
    echo "  Mensaje: $commit_message"
    
    local commit_pattern="^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)\\(.*\\): .+"
    if ! [[ "$commit_message" =~ $commit_pattern ]]; then
        print_error "El commit no sigue la convención de commits"
        print_info "Formato: tipo(descripción): mensaje"
    else
        print_success "Commit sigue convención semántica"
    fi
}

function validate_branch_protection() {
    print_section "Validando protección de rama"
    
    local current_branch
    current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
    
    if [ -z "$current_branch" ]; then
        print_warning "HEAD desconectado, no se puede verificar protección"
        return 0
    fi
    
    local protected_branches=("main" "master" "develop")
    local is_protected=false
    
    for branch in "${protected_branches[@]}"; do
        if [ "$current_branch" = "$branch" ]; then
            is_protected=true
            break
        fi
    done
    
    if [ "$is_protected" = true ]; then
        print_success "Rama '$current_branch' es una rama protegida"
        
        local protected_config
        protected_config=$(git config "branch.$current_branch.protected" 2>/dev/null || echo "")
        
        if [ "$protected_config" = "true" ]; then
            print_success "Configuración de protección detectada localmente"
        else
            print_warning "No se encontró configuración de protección local"
            print_info "Configure con: git config branch.$current_branch.protected true"
        fi
    else
        print_info "Rama '$current_branch' no es una rama protegida"
    fi
}

function validate_working_directory() {
    print_section "Validando estado del working directory"
    
    local status
    status=$(git status --porcelain)
    
    if [ -z "$status" ]; then
        print_success "Working directory limpio"
    else
        local staged_count staged_modified_count untracked_count
        staged_count=$(echo "$status" | grep -c "^.." || echo "0")
        staged_modified_count=$(echo "$status" | grep -c "^M" || echo "0")
        untracked_count=$(echo "$status" | grep -c "^??" || echo "0")
        
        echo ""
        echo "  Archivos en staging: $staged_count"
        echo "  Archivos modificados: $staged_modified_count"
        echo "  Archivos sin rastrear: $untracked_count"
        
        if [ "$staged_count" -gt 0 ] || [ "$staged_modified_count" -gt 0 ]; then
            print_warning "Hay cambios sin commit"
            print_info "Ejecute: git status para ver detalles"
        fi
        
        if [ "$untracked_count" -gt 5 ]; then
            print_warning "Muchos archivos sin rastrear ($untracked_count)"
            print_info "Considere agregar un .gitignore"
        fi
    fi
}

function validate_ci_config() {
    print_section "Validando configuración de CI/CD"
    
    local ci_files=(".github/workflows" ".gitlab-ci.yml" "Jenkinsfile" "azure-pipelines.yml")
    local found_ci=false
    
    for ci_file in "${ci_files[@]}"; do
        if [ -e "$ci_file" ]; then
            print_success "Encontrado: $ci_file"
            found_ci=true
        fi
    done
    
    if [ "$found_ci" = false ]; then
        print_warning "No se encontró configuración de CI/CD"
        print_info "Considere agregar pipelines para validación automática"
    fi
}

function display_summary() {
    print_section "Resumen de validación"
    
    echo ""
    echo -e "  ${RED}Errores:   $ERRORS${RESET}"
    echo -e "  ${YELLOW}Advertencias: $WARNINGS${RESET}"
    echo ""
    
    if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
        echo -e "${GREEN}${BOLD}✓ La rama cumple con todas las validaciones${RESET}"
        return 0
    elif [ "$ERRORS" -eq 0 ]; then
        echo -e "${YELLOW}${BOLD}⚠ La rama tiene advertencias pero es válida${RESET}"
        return 0
    else
        echo -e "${RED}${BOLD}✗ La rama no cumple con los requisitos${RESET}"
        echo ""
        echo "Para corregir los errores:"
        echo "  1. Revise el nombre de la rama"
        echo "  2. Asegure que los commits sigan la convención"
        echo "  3. Mantenga la rama actualizada con upstream"
        return 1
    fi
}

function run_full_validation() {
    check_git_repository
    validate_branch_name_format
    validate_branch_upstream
    validate_commit_history
    validate_branch_protection
    validate_working_directory
    validate_ci_config
    display_summary
}

function validate_specific_branch() {
    local branch_name="$1"
    
    print_section "Validando rama específica: $branch_name"
    
    local current_branch
    current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
    
    if [ -n "$current_branch" ]; then
        git checkout "$branch_name" 2>/dev/null || {
            print_error "No se pudo cambiar a la rama $branch_name"
            exit 1
        }
    fi
    
    validate_branch_name_format
    validate_branch_upstream
    validate_commit_history
    validate_branch_protection
    display_summary
}

function display_usage() {
    cat << EOF
${BOLD}Uso:${RESET}
    $0 [opciones] [rama]

${BOLD}Opciones:${RESET}
    -a, --all          Validar todas las ramas del repositorio
    -b, --branch       Validar una rama específica
    -q, --quiet        Salida mínima
    -v, --verbose      Salida detallada
    -h, --help         Mostrar esta ayuda

${BOLD}Descripción:${RESET}
    Este script valida que las ramas de Git cumplan con la estrategia
    de branching definida, incluyendo:
    
    - Formato del nombre de rama
    - Relación con rama upstream
    - Historial de commits
    - Protección de ramas
    - Estado del working directory
    - Configuración de CI/CD

${BOLD}Convenciones de nombres:${RESET}
    feature:  feature/PROJ-123-descripcion
    hotfix:   hotfix/PROJ-456-descripcion
    release:  release/1.2.0
    bugfix:   bugfix/PROJ-789-descripcion

${BOLD}Commits:${RESET}
    Los mensajes deben seguir la convención Angular:
    tipo(descripción): mensaje
    
   Tipos válidos: feat, fix, docs, style, refactor, test, chore

${BOLD}Ejemplos:${RESET}
    $0                  # Validar rama actual
    $0 -b feature/PROJ-123  # Validar rama específica
    $0 -a                # Validar todas las ramas
EOF
}

function validate_all_branches() {
    print_section "Validando todas las ramas"
    
    local branches
    branches=$(git for-each-ref --format='%(refname:short)' refs/heads/)
    
    local current_branch
    current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
    
    for branch in $branches; do
        echo -e "\n${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        echo -e "${BOLD}  Validando: $branch${RESET}"
        echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        
        if [ "$branch" != "$current_branch" ]; then
            git checkout "$branch" > /dev/null 2>&1
        fi
        
        ERRORS=0
        WARNINGS=0
        
        validate_branch_name_format
        validate_branch_upstream
        validate_commit_history
        validate_branch_protection
        
        if [ "$ERRORS" -gt 0 ]; then
            print_error "Rama '$branch' tiene $ERRORS errores"
        fi
    done
    
    if [ -n "$current_branch" ]; then
        git checkout "$current_branch" > /dev/null 2>&1
    fi
    
    echo -e "\n${BOLD}========================================${RESET}"
    echo -e "${BOLD}  Resumen de todas las ramas${RESET}"
    echo -e "${BOLD}========================================${RESET}"
}

function main() {
    print_header
    
    local mode="current"
    local branch_name=""
    local quiet=false
    local verbose=false
    
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -a|--all)
                mode="all"
                shift
                ;;
            -b|--branch)
                mode="specific"
                branch_name="$2"
                shift 2
                ;;
            -q|--quiet)
                quiet=true
                shift
                ;;
            -v|--verbose)
                verbose=true
                shift
                ;;
            -h|--help)
                display_usage
                exit 0
                ;;
            *)
                branch_name="$1"
                mode="specific"
                shift
                ;;
        esac
    done
    
    case "$mode" in
        current)
            run_full_validation
            ;;
        specific)
            if [ -z "$branch_name" ]; then
                print_error "Debe especificar una rama"
                display_usage
                exit 1
            fi
            validate_specific_branch "$branch_name"
            ;;
        all)
            validate_all_branches
            ;;
    esac
}

main "$@"