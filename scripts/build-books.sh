#!/bin/sh
set -e
set -x

# This script presumes that the books were already built in the pcp.git tree
# Current patches to get latest publican to build them are here:
# https://github.com/mbaldessari/pcp/tree/publican-fixes

rm -rf books
mkdir books
for i in PCP_PG PCP_UAG PCP_TCS; do
    echo $i
    mkdir "books/$i"
    HTMLPATH=$1/books/$i/tmp/en-US/html
    cp -rdp $HTMLPATH books/$i
    HTMLPATH=$1/books/$i/tmp/en-US/html-single
    cp -rdp $HTMLPATH books/$i
    PDFPATH=$1/books/$i/tmp/en-US/pdf
    cp -rdp $PDFPATH books/$i
done
