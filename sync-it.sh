#!/bin/sh
# Mirror the committed site (HEAD of this repo, not the working tree) to
# umbertoanniciello.it. The only file that differs between the two repos is
# CNAME, which this script leaves alone.
set -e
src="$(cd "$(dirname "$0")" && pwd)"
dst="$src/../umbertoanniciello-it"
tmp="$(mktemp -d)"
git -C "$src" archive HEAD | tar -x -C "$tmp"
rsync -a --delete --exclude .git --exclude CNAME --exclude sync-it.sh --exclude .DS_Store "$tmp/" "$dst/"
rm -rf "$tmp"
cd "$dst"
git add -A
git diff --cached --quiet && { echo "already in sync"; exit 0; }
git commit -m "Sync site from umbertoanniciello.com"
git push origin main
echo "published to umbertoanniciello.it"
