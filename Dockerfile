# Build stage
FROM node:22-alpine AS builder

# Install pnpm v9 explicitly to match pnpm-lock.yaml
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Copy workspace files first (these change less frequently)
COPY package.json package-lock.json ./
COPY tsconfig.json ./

# Install dependencies (this will be cached if package files don't change)
RUN npm install --frozen-lockfile

# Copy source code (changes more frequently)
COPY .env ./

# Build packages first
RUN npm run build

# Build web app
WORKDIR /app/ymsports
RUN npm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/tsconfig.json ./

# Copy built webapp
COPY --from=builder /app/ymsports ./ymsports

# Create certs directory and copy CA certificate if it exists (wildcard makes it optional)
RUN mkdir -p /app/certs
COPY ca-certificate.crt /app/certs/

# Install production dependencies only
RUN npm install --prod --frozen-lockfile

WORKDIR /app/ymsports

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_EXTRA_CA_CERTS=/app/certs/ca-certificate.crt

CMD ["npm", "run", "start"]
