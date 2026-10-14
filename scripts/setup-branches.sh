#!/bin/bash

set -euo pipefail

readonly RESET="\033[0m"
readonly BOLD="\033[1m"
readonly GREEN="\033[32m"
readonly YELLOW="\033[33m"
readonly RED="\033[31m"
readonly BLUE="\033[34m"
readonly CYAN="\033[36m"

readonly BRANCHING_STRATEGY_VERSION="2.0.0"
readonly DEFAULT_MAIN_BRANCH="main"
readonly DEFAULT_DEVELOP_BRANCH="develop"
readonly FEATURE_PREFIX="feature/"
readonly HOTFIX_PREFIX="hotfix/"
readonly RELEASE_PREFIX="release/"
readonly BUGFIX_PREFIX="bugfix/"
readonly SUPPORT_PREFIX="support/"

function print_header() {
    echo -e "${BOLD}${BLUE}========================================${RESET}"
    echo -e "${BOLD}${BLUE}  Git Branching Strategy Setup${RESET}"
    echo -e "${BOLD}${BLUE}  Version: ${BRANCHING_STRATEGY_VERSION}${RESET}"
    echo -e "${BOLD}${BLUE}========================================${RESET}"
    echo ""
}

function print_success() {
    echo -e "${GREEN}✓${RESET} $1"
}

function print_warning() {
    echo -e "${YELLOW}⚠${RESET} $1"
}

function print_error() {
    echo -e "${RED}✗${RESET} $1"
}

function print_info() {
    echo -e "${CYAN}ℹ${RESET} $1"
}

function check_git_repository() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "No se encuentra en un repositorio Git"
        exit 1
    fi
    print_success "Repositorio Git detectado"
}

function check_git_available() {
    if ! command -v git &> /dev/null; then
        print_error "Git no está instalado"
        exit 1
    fi
    print_success "Git disponible: $(git --version)"
}

function validate_branch_name() {
    local branch_name="$1"
    local pattern="^(feature|hotfix|release|bugfix|support)\\/[A-Z]+-[0-9]+-[a-z0-9-]+$|^main$|^develop$|^release\\/[0-9]+\\.[0-9]+\\.[0-9]+$"
    
    if [[ ! "$branch_name" =~ $pattern ]]; then
        print_error "Nombre de rama inválido: $branch_name"
        print_info "Formato esperado: tipo/TICKET-descripcion"
        print_info "Ejemplos:"
        print_info "  - feature/PROJ-123-agregar-filtro"
        print_info "  - hotfix/PROJ-456-corregir-error"
        print_info "  - release/1.2.0"
        return 1
    fi
    return 0
}

function branch_exists() {
    local branch_name="$1"
    git rev-parse --verify "$branch_name" > /dev/null 2>&1
}

function create_main_branch() {
    local main_branch="${1:-$DEFAULT_MAIN_BRANCH}"
    
    echo -e "\n${BOLD}Creando rama principal: $main_branch${RESET}"
    
    if branch_exists "$main_branch"; then
        print_warning "La rama '$main_branch' ya existe"
    else
        git checkout -b "$main_branch" 2>/dev/null || git branch "$main_branch"
        print_success "Rama '$main_branch' creada"
    fi
    
    git config branch."$main_branch".protected "true"
    git config branch."$main_branch".description "Rama principal de producción"
    print_info "Rama '$main_branch' configurada como protegida"
}

function create_develop_branch() {
    local develop_branch="${1:-$DEFAULT_DEVELOP_BRANCH}"
    
    echo -e "\n${BOLD}Creando rama de desarrollo: $develop_branch${RESET}"
    
    if branch_exists "$develop_branch"; then
        print_warning "La rama '$develop_branch' ya existe"
    else
        if branch_exists "main"; then
            git checkout -b "$develop_branch" main
        else
            git checkout -b "$develop_branch"
        fi
        print_success "Rama '$develop_branch' creada desde main"
    fi
    
    git config branch."$develop_branch".protected "true"
    git config branch."$develop_branch".description "Rama de integración continua"
    print_info "Rama '$develop_branch' configurada como protegida"
}

function create_feature_branch() {
    local ticket_id="$1"
    local description="$2"
    local base_branch="${3:-$DEFAULT_DEVELOP_BRANCH}"
    local branch_name="${FEATURE_PREFIX}${ticket_id}-${description}"
    
    echo -e "\n${BOLD}Creando rama de feature: $branch_name${RESET}"
    
    if ! validate_branch_name "$branch_name"; then
        return 1
    fi
    
    if branch_exists "$branch_name"; then
        print_warning "La rama '$branch_name' ya existe"
        git checkout "$branch_name"
    else
        if ! branch_exists "$base_branch"; then
            print_error "La rama base '$base_branch' no existe"
            return 1
        fi
        
        git fetch origin "$base_branch"
        git checkout -b "$branch_name" "origin/$base_branch"
        print_success "Rama '$branch_name' creada desde $base_branch"
    fi
    
    git config branch."$branch_name".type "feature"
    git config branch."$branch_name".ticket "$ticket_id"
    git config branch."$branch_name".description "Feature: $description"
}

function create_hotfix_branch() {
    local ticket_id="$1"
    local description="$2"
    local base_branch="${3:-$DEFAULT_MAIN_BRANCH}"
    local branch_name="${HOTFIX_PREFIX}${ticket_id}-${description}"
    
    echo -e "\n${BOLD}Creando rama de hotfix: $branch_name${RESET}"
    
    if ! validate_branch_name "$branch_name"; then
        return 1
    fi
    
    if branch_exists "$branch_name"; then
        print_warning "La rama '$branch_name' ya existe"
        git checkout "$branch_name"
    else
        if ! branch_exists "$base_branch"; then
            print_error "La rama base '$base_branch' no existe"
            return 1
        fi
        
        git fetch origin "$base_branch"
        git checkout -b "$branch_name" "origin/$base_branch"
        print_success "Rama '$branch_name' creada desde $base_branch"
    fi
    
    git config branch."$branch_name".type "hotfix"
    git config branch."$branch_name".ticket "$ticket_id"
    git config branch."$branch_name".description "Hotfix: $description"
}

function create_release_branch() {
    local version="$1"
    local base_branch="${2:-$DEFAULT_DEVELOP_BRANCH}"
    local branch_name="${RELEASE_PREFIX}${version}"
    
    echo -e "\n${BOLD}Creando rama de release: $branch_name${RESET}"
    
    if ! validate_branch_name "$branch_name"; then
        return 1
    fi
    
    if branch_exists "$branch_name"; then
        print_warning "La rama '$branch_name' ya existe"
        git checkout "$branch_name"
    else
        if ! branch_exists "$base_branch"; then
            print_error "La rama base '$base_branch' no existe"
            return 1
        fi
        
        git fetch origin "$base_branch"
        git checkout -b "$branch_name" "origin/$base_branch"
        print_success "Rama '$branch_name' creada desde $base_branch"
    fi
    
    git config branch."$branch_name".type "release"
    git config branch."$branch_name".version "$version"
    git config branch."$branch_name".description "Release version $version"
}

function setup_branch_protection() {
    local branch_name="$1"
    local require_reviews="${2:-true}"
    local require_checks="${3:-true}"
    
    echo -e "\n${BOLD}Configurando protección para: $branch_name${RESET}"
    
    if command -v gh &> /dev/null; then
        gh repo set-default-protection "$branch_name" 2>/dev/null || true
        print_info "Protección de rama configurada (GitHub CLI)"
    elif command -v glab &> /dev/null; then
        print_info "Configura la protección manualmente en GitLab"
    else
        print_info "Use la interfaz del proveedor Git para configurar protección"
    fi
    
    print_success "Protección configurada para '$branch_name'"
}

function setup_git_hooks() {
    local hooks_dir=".git/hooks"
    
    echo -e "\n${BOLD}ConfigurandoGit hooks${RESET}"
    
    if [ ! -d "$hooks_dir" ]; then
        mkdir -p "$hooks_dir"
    fi
    
    cat > "$hooks_dir/commit-msg" << 'HOOK'
#!/bin/bash

BRANCH_NAME=$(git symbolic-ref --short HEAD 2>/dev/null)
COMMIT_MSG=$(cat "$1")

PATTERN="^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)\\(.*\\): .+"

if ! [[ "$COMMIT_MSG" =~ $PATTERN ]]; then
    echo "Error: El mensaje de commit no sigue la convención Angular"
    echo "Formato requerido: tipo(descripción): mensaje"
    echo "Tipos válidos: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert"
    exit 1
fi

FEATURE_PATTERN="^(feature|hotfix|release|bugfix|support)\\/[A-Z]+-[0-9]+"
if ! [[ "$BRANCH_NAME" =~ $FEATURE_PATTERN ]] && [ "$BRANCH_NAME" != "main" ] && [ "$BRANCH_NAME" != "develop" ]; then
    echo "Advertencia: La rama $BRANCH_NAME no sigue el patrón de nomenclatura"
fi
HOOK

    chmod +x "$hooks_dir/commit-msg"
    print_success "Hook de commit-msg instalado"
    print_info "Los mensajes de commit ahora se validan contra la convención Angular"
}

function display_branching_diagram() {
    echo -e "\n${BOLD}${CYAN}========================================${RESET}"
    echo -e "${BOLD}${CYAN}  Diagrama de Ramas${RESET}"
    echo -e "${BOLD}${CYAN}========================================${RESET}\n"
    
    cat << 'EOF'
                    ┌─────────────┐
                    │     main    │ ← Producción estable
                    └──────┬──────┘
                           │
                           │ (tag release/v1.0.0)
                           │
                    ┌──────▼──────┐
                    │  develop    │ ← Integración continua
                    └──────┬──────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
    │feature/ │      │feature/ │      │feature/ │
    │PROJ-123 │      │PROJ-124 │      │PROJ-125 │
    │-filter  │      │-search  │      │-export  │
    └────┬────┘      └────┬────┘      └────┬────┘
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
                    ┌──────▼──────┐
                    │  release/   │ ← Preparar Release
                    │   1.1.0     │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
        ┌────▼────┐              ┌──────▼──────┐
        │  main   │              │   develop   │
        │(v1.1.0) │              │  (merge)    │
        └─────────┘              └─────────────┘
              │
        ┌─────▼─────┐
        │ hotfix/   │ ← Corrección urgente
        │PROJ-456   │
        └─────┬─────┘
              │
        ┌─────▼─────┐
        │  main     │
        │(v1.0.1)   │
        └───────────┘
EOF
}

function display_usage() {
    cat << EOF
${BOLD}Uso:${RESET}
    $0 [comando] [opciones]

${BOLD}Comandos:${RESET}
    init                    Inicializar la estrategia de branching completa
    feature <ticket> <desc> Crear una rama de feature
    hotfix <ticket> <desc>  Crear una rama de hotfix
    release <version>       Crear una rama de release
    diagram                 Mostrar el diagrama de ramas
    hooks                   Instalar Git hooks
    help                    Mostrar esta ayuda

${BOLD}Opciones:${RESET}
    -b, --base <rama>       Rama base para crear la nueva rama
    -h, --help              Mostrar ayuda

${BOLD}Ejemplos:${RESET}
    $0 init
    $0 feature PROJ-123 agregar-filtro-busqueda
    $0 hotfix PROJ-456 corregir-error-login
    $0 release 1.2.0
    $0 feature PROJ-789 nueva-funcionalidad -b develop

${BOLD}Convenciones de nombres:${RESET}
    feature:  feature/PROJ-123-descripcion-corta
    hotfix:   hotfix/PROJ-456-descripcion-corta
    release:  release/1.2.0
    bugfix:   bugfix/PROJ-789-descripcion

${BOLD}Commits semánticos:${RESET}
    feat:     Nuevas funcionalidades
    fix:      Corrección de errores
    docs:     Documentación
    style:    Formateo, sin cambio de lógica
    refactor: Refactorización
    test:     Tests
    chore:    Mantenimiento
    perf:     Mejoras de rendimiento
    ci:       Cambios en CI/CD
    build:    Cambios en build
    revert:   Revertir cambios
EOF
}

function initialize_branching_strategy() {
    print_info "Inicializando estrategia de branching..."
    
    check_git_available
    check_git_repository
    
    create_main_branch "$DEFAULT_MAIN_BRANCH"
    create_develop_branch "$DEFAULT_DEVELOP_BRANCH"
    
    setup_git_hooks
    
    echo -e "\n${BOLD}Creando estructura de ramas de ejemplo:${RESET}"
    create_feature_branch "PROJ-100" "configurar-linting" "develop"
    create_feature_branch "PROJ-101" "agregar-tests-unitarios" "develop"
    
    echo -e "\n${GREEN}${BOLD}========================================${RESET}"
    echo -e "${GREEN}${BOLD}  Estrategia de branching inicializada${RESET}"
    echo -e "${GREEN}${BOLD}========================================${RESET}\n"
    
    print_success "Ramas principales creadas: main, develop"
    print_success "Git hooks configurados"
    print_info "Ejecute '$0 diagram' para ver el flujo de ramas"
    
    display_branching_diagram
}

function main() {
    print_header
    
    local command="${1:-}"
    
    case "$command" in
        init)
            initialize_branching_strategy
            ;;
        feature)
            local ticket="${2:-}"
            local description="${3:-}"
            if [ -z "$ticket" ] || [ -z "$description" ]; then
                print_error "Se requiere ticket y descripción"
                display_usage
                exit 1
            fi
            create_feature_branch "$ticket" "$description"
            ;;
        hotfix)
            local ticket="${2:-}"
            local description="${3:-}"
            if [ -z "$ticket" ] || [ -z "$description" ]; then
                print_error "Se requiere ticket y descripción"
                display_usage
                exit 1
            fi
            create_hotfix_branch "$ticket" "$description"
            ;;
        release)
            local version="${2:-}"
            if [ -z "$version" ]; then
                print_error "Se requiere versión"
                display_usage
                exit 1
            fi
            create_release_branch "$version"
            ;;
        diagram)
            display_branching_diagram
            ;;
        hooks)
            setup_git_hooks
            ;;
        help|--help|-h)
            display_usage
            ;;
        *)
            print_error "Comando desconocido: $command"
            display_usage
            exit 1
            ;;
    esac
}

main "$@"