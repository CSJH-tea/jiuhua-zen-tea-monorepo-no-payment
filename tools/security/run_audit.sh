#!/usr/bin/env bash
set -e
echo "Running npm audit for each app..."
for d in apps/*; do
  if [ -f "$d/package.json" ]; then
    echo "=== $d ==="
    (cd $d && npm install --package-lock-only && npm audit --audit-level=high) || true
  fi
done
echo "You can also run 'snyk test' if you use Snyk and have SNYK_TOKEN set."
