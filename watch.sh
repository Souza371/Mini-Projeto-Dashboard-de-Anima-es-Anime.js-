#!/bin/bash

# Configurações
REPO_DIR="/workspaces/Mini-Projeto-Dashboard-de-Anima-es-Anime.js-"
COMMIT_MSG="Auto-update: $(date +'%Y-%m-%d %H:%M:%S')"

cd "$REPO_DIR" || exit

echo "🔍 Iniciando monitoramento (Ctrl+C para parar)"

while true; do
  if git diff --quiet; then
    echo "➤ Sem mudanças ($(date +'%H:%M:%S'))"
  else
    echo "➤ Mudanças detectadas! Enviando..."
    git add .
    git commit -m "$COMMIT_MSG"
    git pull --rebase origin main
    git push origin main
    echo "✓ Atualizado às $(date +'%H:%M:%S')"
  fi
  sleep 30
done
