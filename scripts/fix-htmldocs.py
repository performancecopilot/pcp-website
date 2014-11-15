#!/usr/bin/python

from __future__ import print_function
from bs4 import BeautifulSoup
from subprocess import call
import bs4
import codecs
import os
import re
import shutil
import sys
import tempfile

from skip_list import ext_manpages

with open(sys.argv[1], "r") as f:
    data = f.read()

soup = BeautifulSoup(data)
#
# Fix up all internal man urls
# http://man7.org/linux/man-pages/man1/pmval.1.html
for url in soup.find_all('a'):
    link = url.get("href")
    if link is None:
        continue
    # http://man7.org/linux/man-pages/man1/pmiostat.1.html
    link = link.lower().strip()
    ret = re.match('^http://man7.org/linux/man-pages/man(\d)/(\S+).(\d).html$', link)
    if not ret:
        continue
    (section, page, _) = ret.groups()
    if page not in ext_manpages:
        # /man/man2html?3+__pmGetConfig
        newlink = re.sub('http://man7.org/linux/man-pages', '/man', link)
        url['href'] = newlink

# remove all the img tags like the following ones:
# <img alt="" border="0" height="16" src="images/stepfwd_on.png" width="16"/>
for img in soup.find_all('img'):
    if img.has_attr('src') and img['src'] == 'images/stepfwd_on.png':
        img.extract()

contents = soup.body
contents.extract()

# First tag is always a table, remove it
table = contents.findNext()
table.extract()


# Remove all bgcolor and color attributes
for tag in contents.recursiveChildGenerator():
    if isinstance(tag, bs4.Tag):
        if tag.has_attr('bgcolor'):
            del tag['bgcolor']
        elif tag.has_attr('color'):
            del tag['color']

s = contents.prettify()

# Remove the body tags themselves
s = re.sub('<body.*>', '', s)
s = s.replace('</body>', '')

# Strip away the last copyright line
last_hr_index = s.rfind('<hr/>')
s = s[0:last_hr_index]
s.encode('utf-8')
with codecs.open(sys.argv[1], "w", "utf-8-sig") as temp:
    temp.write(s)

haml_fname = "scripts/docpage.haml"
with open(haml_fname, "r") as f:
    haml_template = f.read()

haml = haml_template.replace("__DOCPAGE__", sys.argv[1])

(_, tmpfile) = tempfile.mkstemp(suffix='pre')
(_, tmpfile2) = tempfile.mkstemp(suffix='post')
with open(tmpfile, 'w') as f:
    f.write(haml)

call(["haml", tmpfile, tmpfile2])
os.unlink(tmpfile)
shutil.move(tmpfile2, sys.argv[1])
