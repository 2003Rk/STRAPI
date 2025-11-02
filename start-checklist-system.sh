#!/bin/bash

echo "🚀 Starting Strapi Backend and Webhook Server..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}   ESTATE CHECKLIST MANAGEMENT SYSTEM     ${NC}"
echo -e "${BLUE}===========================================${NC}"

# Function to start Strapi
start_strapi() {
    echo -e "\n${GREEN}Starting Strapi Backend...${NC}"
    cd strapi-backend
    npm run develop &
    STRAPI_PID=$!
    echo -e "${GREEN}✅ Strapi started with PID: $STRAPI_PID${NC}"
    cd ..
}

# Function to start webhook server
start_webhook() {
    echo -e "\n${GREEN}Starting Webhook Server...${NC}"
    node webhook-server.js &
    WEBHOOK_PID=$!
    echo -e "${GREEN}✅ Webhook server started with PID: $WEBHOOK_PID${NC}"
}

# Function to start ngrok
start_ngrok() {
    echo -e "\n${GREEN}Starting Ngrok Tunnel...${NC}"
    ngrok http 1337 &
    NGROK_PID=$!
    echo -e "${GREEN}✅ Ngrok started with PID: $NGROK_PID${NC}"
    echo -e "${YELLOW}📡 Ngrok dashboard available at: http://localhost:4040${NC}"
}

# Function to initialize checklist items
initialize_checklist() {
    echo -e "\n${YELLOW}Waiting for Strapi to be ready...${NC}"
    sleep 10
    
    echo -e "${GREEN}Initializing default checklist items...${NC}"
    curl -X POST http://localhost:1337/api/checklist-items/initialize \
         -H "Content-Type: application/json" \
         --silent --output /dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Default checklist items initialized!${NC}"
    else
        echo -e "${RED}❌ Failed to initialize checklist items${NC}"
    fi
}

# Function to show URLs
show_urls() {
    echo -e "\n${BLUE}===========================================${NC}"
    echo -e "${BLUE}   AVAILABLE ENDPOINTS                    ${NC}"
    echo -e "${BLUE}===========================================${NC}"
    echo -e "${GREEN}🏠 Strapi Admin Panel:${NC} http://localhost:1337/admin"
    echo -e "${GREEN}📋 Checklist API:${NC} http://localhost:1337/api/checklist-items"
    echo -e "${GREEN}🔗 Webhook Server:${NC} http://localhost:3002"
    echo -e "${GREEN}📡 Ngrok Dashboard:${NC} http://localhost:4040"
    echo -e "\n${YELLOW}📋 Checklist Management Endpoints:${NC}"
    echo -e "   GET  /api/checklist-items/progress?user=USER_ID"
    echo -e "   PUT  /api/checklist-items/:id/complete"
    echo -e "   PUT  /api/checklist-items/:id/incomplete"
    echo -e "   POST /api/checklist-items/initialize"
}

# Function to cleanup on exit
cleanup() {
    echo -e "\n${RED}Stopping all services...${NC}"
    if [ ! -z "$STRAPI_PID" ]; then
        kill $STRAPI_PID 2>/dev/null
        echo -e "${RED}❌ Stopped Strapi${NC}"
    fi
    if [ ! -z "$WEBHOOK_PID" ]; then
        kill $WEBHOOK_PID 2>/dev/null
        echo -e "${RED}❌ Stopped Webhook Server${NC}"
    fi
    if [ ! -z "$NGROK_PID" ]; then
        kill $NGROK_PID 2>/dev/null
        echo -e "${RED}❌ Stopped Ngrok${NC}"
    fi
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main execution
main() {
    echo -e "${GREEN}Starting all services...${NC}"
    
    # Check if we're in the right directory
    if [ ! -d "strapi-backend" ]; then
        echo -e "${RED}❌ Error: strapi-backend directory not found!${NC}"
        echo -e "${YELLOW}Please run this script from the project root directory.${NC}"
        exit 1
    fi
    
    # Start services
    start_strapi
    start_webhook
    start_ngrok
    
    # Initialize checklist items
    initialize_checklist
    
    # Show available URLs
    show_urls
    
    echo -e "\n${GREEN}🎉 All services are running!${NC}"
    echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
    
    # Keep script running
    wait
}

# Run main function
main
