#!/bin/bash

# Production Build Pipeline
# Runs tests, build, sync, and icon generation with proper error handling
# Following Clean Architecture principles with clear separation of concerns

# Color codes for better output readability
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly PURPLE='\033[0;35m'
readonly NC='\033[0m' # No Color

# Configuration
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
readonly LOG_FILE="$PROJECT_ROOT/build.log"

# Build pipeline steps configuration
declare -a PIPELINE_STEPS=(
    "run_checks|npm run check|🔍 Running type check, lint & format"
    "lint_tests|npm run lint:tests|🧪 Linting test files"
    "run_tests|npm run test|🧪 Running tests"
    "build_project|npm run build|📦 Building project"
    "sync_capacitor|npx cap sync ios|📱 Syncing Capacitor iOS"
    "generate_icons|npx capacitor-assets generate --ios|🎨 Generating iOS icons"
)

# Utility functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] INFO: $1" >> "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] SUCCESS: $1" >> "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: $1" >> "$LOG_FILE"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1" >> "$LOG_FILE"
}

log_step() {
    echo -e "${PURPLE}$1${NC}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] STEP: $1" >> "$LOG_FILE"
}

# Timer functions
start_timer() {
    STEP_START_TIME=$(date +%s)
}

end_timer() {
    local step_end_time=$(date +%s)
    local duration=$((step_end_time - STEP_START_TIME))
    echo -e "${BLUE}⏱️  Completed in ${duration}s${NC}"
}

# Error handler
handle_error() {
    local exit_code=$1
    local step_name=$2
    
    log_error "Step '$step_name' failed with exit code $exit_code"
    log_error "Build pipeline terminated. Check $LOG_FILE for details."
    
    echo ""
    echo -e "${RED}💥 Build pipeline failed at step: $step_name${NC}"
    echo -e "${YELLOW}📋 To debug:${NC}"
    echo -e "   ${BLUE}• Check the log file: $LOG_FILE${NC}"
    echo -e "   ${BLUE}• Run the failed command manually to see detailed errors${NC}"
    echo -e "   ${BLUE}• Ensure all dependencies are installed${NC}"
    
    exit $exit_code
}

# Pipeline step functions
run_checks() {
    log_step "🔍 Running type check, lint & format"
    start_timer
    
    if npm run check 2>&1 | tee -a "$LOG_FILE"; then
        log_success "Type check, lint & format completed"
        end_timer
        return 0
    else
        return ${PIPESTATUS[0]}
    fi
}

lint_tests() {
    log_step "🧪 Linting test files"
    start_timer
    
    if npm run lint:tests 2>&1 | tee -a "$LOG_FILE"; then
        log_success "Test files linted successfully"
        end_timer
        return 0
    else
        return ${PIPESTATUS[0]}
    fi
}

run_tests() {
    log_step "🧪 Running tests"
    start_timer
    
    if npm run test 2>&1 | tee -a "$LOG_FILE"; then
        log_success "All tests passed"
        end_timer
        return 0
    else
        return ${PIPESTATUS[0]}
    fi
}

build_project() {
    log_step "📦 Building project"
    start_timer
    
    if npm run build 2>&1 | tee -a "$LOG_FILE"; then
        log_success "Project built successfully"
        end_timer
        return 0
    else
        return ${PIPESTATUS[0]}
    fi
}

generate_icons() {
    log_step "🎨 Generating iOS icons"
    start_timer
    
    if npx capacitor-assets generate --ios 2>&1 | tee -a "$LOG_FILE"; then
        log_success "iOS icons generated successfully"
        end_timer
        return 0
    else
        return ${PIPESTATUS[0]}
    fi
}

# Pre-flight checks
pre_flight_checks() {
    log_info "Running pre-flight checks..."
    
    # Check if we're in the right directory
    if [ ! -f "$PROJECT_ROOT/package.json" ]; then
        log_error "package.json not found. Please run this script from the project root."
        exit 1
    fi
    
    # Check for required files
    local required_files=(
        "package.json"
        "capacitor.config.ts"
    )
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$PROJECT_ROOT/$file" ]; then
            log_error "Required file not found: $file"
            exit 1
        fi
    done
    
    # Check for required commands
    local required_commands=("npm" "npx")
    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            log_error "Required command not found: $cmd"
            exit 1
        fi
    done
    
    # Check for assets directory
    if [ ! -d "$PROJECT_ROOT/assets" ]; then
        log_error "Assets directory not found. Please create an 'assets' directory with an 'icon.png' and 'splash.png'."
        exit 1
    fi
    
    log_success "Pre-flight checks passed"
}

# Main execution function
main() {
    local start_time=$(date +%s)
    
    # Initialize log file
    echo "=== Production Build Pipeline Started at $(date) ===" > "$LOG_FILE"
    
    echo -e "${PURPLE}🚀 Starting Production Build Pipeline${NC}"
    echo -e "${BLUE}📋 Pipeline steps: Check → Lint Tests → Test → Build → Sync → Icons${NC}"
    echo -e "${BLUE}📄 Logging to: $LOG_FILE${NC}"
    echo ""
    
    # Change to project root
    cd "$PROJECT_ROOT" || exit 1
    
    # Run pre-flight checks
    pre_flight_checks
    echo ""
    
    # Execute pipeline steps
    local step_count=1
    local total_steps=6
    
    for step_info in "${PIPELINE_STEPS[@]}"; do
        IFS='|' read -r step_func step_cmd step_desc <<< "$step_info"
        
        echo -e "${PURPLE}[$step_count/$total_steps] $step_desc${NC}"
        
        if ! $step_func; then
            handle_error $? "$step_desc"
        fi
        
        echo ""
        ((step_count++))
    done
    
    # Calculate total time
    local end_time=$(date +%s)
    local total_duration=$((end_time - start_time))
    
    # Success message
    echo -e "${GREEN}🎉 Production build pipeline completed successfully!${NC}"
    echo -e "${BLUE}⏱️  Total time: ${total_duration}s${NC}"
    echo -e "${BLUE}📱 Your iOS app is ready for deployment${NC}"
    
    log_success "Production build pipeline completed in ${total_duration}s"
}

# Help function
show_help() {
    echo "Production Build Pipeline"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -v, --verbose  Enable verbose logging"
    echo ""
    echo "Pipeline steps:"
    echo "  1. 🔍 Run checks (npm run check - type check, lint, format)"
    echo "  2. 🧪 Lint test files (npm run lint:tests)"
    echo "  3. 🧪 Run tests (npm run test)"
    echo "  4. 📦 Build project (npm run build)"
    echo "  5. 📱 Sync Capacitor iOS (npx cap sync ios)"
    echo "  6. 🎨 Generate iOS icons (npx capacitor-assets generate --ios)"
    echo ""
    echo "The pipeline will stop at the first failed step."
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -v|--verbose)
            set -x
            shift
            ;;
        *)
            log_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Execute main function
main "$@"