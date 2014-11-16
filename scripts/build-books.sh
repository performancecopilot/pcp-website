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

# FIXME: horrendous hack. This needs to be done in publican/xsl
for i in `find books/ -type f -iname '*.html'`; do
    perl -pi -e "s,</header>,</header> <div class='site-content'> <div class='how-to is-typeset'> <div class='row-parent'> <div class='row'>," "$i";
    perl -pi -e 's,<footer xmlns="" class="global-footer is-typeset">,</div> </div> </div> </div> <footer class="global-footer is-typeset">,' "$i";
done
