#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
token_file="$script_dir/github-token.txt"

if [[ -t 0 ]]; then
  read -r -s -p 'Cole o token do GitHub (entrada oculta): ' token
  printf '\n'
else
  echo 'Execute este script em um terminal interativo para digitar o token com segurança.' >&2
  exit 1
fi

if [[ -z "$token" ]]; then
  echo 'Token vazio; nada foi salvo.' >&2
  exit 1
fi

umask 077
printf '%s' "$token" > "$token_file"
unset token
chmod 600 "$token_file"
printf 'Token salvo em %s (permissões restritas ao seu usuário).\n' "$token_file"
