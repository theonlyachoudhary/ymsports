#!/bin/bash

# Production Deployment Script for DevCrafter
# This script should be run on the production server
# Usage: ./deploy.sh

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Main deployment function
deploy() {
    set -e

    echo -e "${BLUE}🚀 Ymsports Production Deployment${NC}"
    echo "===================================="
    echo ""

    # Ensure we're in the right directory
    if [ ! -f "docker-compose.yml" ]; then
        echo -e "${RED}❌ docker-compose.yml not found. Are you in the project directory?${NC}"
        exit 1
    fi

    # Stop existing containers
    echo ""
    echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
    docker compose down

    # Clean up old images
    echo ""
    echo -e "${BLUE}🧹 Cleaning up old images...${NC}"
    docker system prune -f

    # Build new images
    echo ""
    echo -e "${BLUE}🏗️  Building new images...${NC}"
    docker compose build

    # Start services with production configuration
    echo ""
    echo -e "${BLUE}🚀 Starting services...${NC}"
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

    # Wait for web service
    echo ""
    echo -e "${BLUE}⏳ Waiting for web service...${NC}"
    sleep 15

    # Health checks
    echo ""
    echo -e "${BLUE}🏥 Running health checks...${NC}"

    # Check container status
    echo "Container Status:"
    docker compose ps

    echo ""
    # Check web health
    if docker compose exec -T web wget --tries=3 --timeout=10 http://localhost:3000/api/health -O - > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Web service is healthy${NC}"
    else
        echo -e "${RED}⚠️  Web service health check failed${NC}"
    fi

    # Check nginx
    if docker compose exec -T nginx wget --tries=3 --timeout=5 http://127.0.0.1/health -O - > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Nginx is healthy${NC}"
    else
        echo -e "${RED}⚠️  Nginx health check failed${NC}"
    fi

    # Display logs
    echo ""
    echo -e "${BLUE}📋 Recent logs:${NC}"
    docker compose logs --tail=30

    # Summary
    echo ""
    echo -e "${GREEN}✅ Deployment Complete!${NC}"
    echo ""
    echo "📊 Summary:"
    echo "  - Services: $(docker compose ps --services | wc -l) running"
    echo "  - Web URL: http://$(hostname -I | awk '{print $1}')"
    echo ""
    echo "📝 Next steps:"
    echo "  - Monitor logs: docker compose logs -f"
    echo "  - Check status: docker compose ps"
    echo "  - Rollback: git checkout <previous-commit> && ./deploy.sh"
    echo ""
}

# Execute deployment with error handling
if deploy; then
    exit 0
else
    EXIT_CODE=$?
    exit $EXIT_CODE
fi
