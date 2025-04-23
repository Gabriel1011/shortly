#!/bin/sh
set -e

# Executar migrações do Prisma
echo "Executando migrações do Prisma..."
npx prisma migrate deploy

# Iniciar a aplicação
echo "Iniciando a aplicação..."
exec "$@"
