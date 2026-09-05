#!/bin/sh
# Copy this page to the .it site and publish it. The only file that differs
# between the two repos is CNAME, which this script leaves alone.
set -e
src="$(cd "$(dirname "$0")" && pwd)"
dst="$src/../umbertoanniciello-it"
cp "$src/index.html" "$dst/index.html"
cd "$dst"
git add -A
git diff --cached --quiet && { echo "already in sync"; exit 0; }
git commit -m "Sync page from umbertoanniciello.com"
git push origin main
echo "published to umbertoanniciello.it"
