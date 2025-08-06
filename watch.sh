#!/bin/bash

REPO_DIR="$(pwd)"
COMMIT_MSG="Auto-update: $(date)"

echo "Monitorando..."

while true; do
  if git diff --quiet; then
    echo "➤ Sem mudanças ($(date +%T))"
  else
    git add . && git commit -m "$COMMIT_MSG" && git pull --rebase && git push
    echo "✓ Atualizado"
  fi
  sleep 30
done
