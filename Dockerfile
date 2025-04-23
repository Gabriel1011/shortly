FROM node:22-alpine AS base

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Diretório de trabalho
WORKDIR /app

# Camada de dependências
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Camada de build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# Camada de produção
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Adicionar script de inicialização
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Criar diretório para o banco de dados e ajustar permissões
RUN mkdir -p /app/prisma/data
RUN chown -R nextjs:nodejs /app/prisma/data

# Definir volume
VOLUME /app/prisma/data

# Mudar para usuário não-root
USER nextjs

# Porta da aplicação
EXPOSE 3000

# Usar o script de inicialização
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["node", "server.js"]
