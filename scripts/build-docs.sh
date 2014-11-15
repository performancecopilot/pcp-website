#!/bin/sh
set -e

for i in `find docs -type f -iname '*.html'`; do 
    echo "Building: $i"
    ./scripts/fix-htmldocs.py $i
done

# Remove the non html files:
find man/ -type f -not -iname '*.html' -exec rm "{}" \;
