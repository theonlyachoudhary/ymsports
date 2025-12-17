# Build stage
FROM node:22-alpine AS builder

# Install pnpm v9 explicitly to match pnpm-lock.yaml
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Copy package files first (these change less frequently)
COPY package.json package-lock.json ./
COPY tsconfig.json ./

# Install dependencies (this will be cached if package files don't change)
RUN npm install --force --frozen-lockfile

# Copy all source code and configuration files
COPY .env ./
COPY src ./src
COPY public ./public
COPY next.config.js ./
COPY redirects.js ./
COPY tailwind.config.mjs ./
COPY postcss.config.js ./
COPY next-sitemap.config.cjs ./

# Build the application
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

# Copy built Next.js app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy configuration files needed at runtime
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/redirects.js ./
COPY --from=builder /app/tailwind.config.mjs ./
COPY --from=builder /app/postcss.config.js ./

# Create certs directory and optionally copy CA certificate if it exists
RUN mkdir -p /app/certs
RUN if [ -f ca-certificate.crt ]; then cp ca-certificate.crt /app/certs/; fi || true

# Install production dependencies only
RUN npm install --prod --force --frozen-lockfile

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_EXTRA_CA_CERTS=/app/certs/ca-certificate.crt

CMD ["npm", "run", "start"]
