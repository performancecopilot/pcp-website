#!/usr/bin/python

from __future__ import print_function
from bs4 import BeautifulSoup
from subprocess import call
import codecs
import os
import shutil
import sys
import tempfile
import urllib

from skip_list import ext_manpages


with open(sys.argv[1], "r") as f:
    data = f.read()

soup = BeautifulSoup(data, "lxml")
# Fix up all internal man urls
for url in soup.find_all('a'):
    link = url.get("href")
    if link is None:
        continue
    link = urllib.unquote(link)
    if link.lower().startswith("/man/man2html?"):
        # /man/man2html?3+__pmGetConfig
        section = link[link.find('?') + 1]
        page = link[link.find('+') + 1:].lower().strip('_')
        if page in ext_manpages:
            newlink = "http://man7.org/linux/man-pages/man%s/%s.%s.html" % (section, page, section)
        else:
            newlink = "/man/man%s/%s.%s.html" % (section, page, section)
        url['href'] = newlink
    elif link.lower() == ("/man/man2html"):
        url['href'] = '/man'
    elif link.lower().startswith('file:///usr/include/pcp/'):
        # file:///usr/include/pcp/pmapi.h
        inc = link.split('/')[-1]
        giturl = "https://github.com/performancecopilot/pcp/tree/master/src/include/pcp/%s" % inc
        url['href'] = giturl

contents = soup.body
contents.extract()
s = contents.prettify()

# Remove the body tags themselves
s = s.replace('<body>', '')
s = s.replace('</body>', '')

# Strip away This document was created
last_hr_index = s.rfind('<hr/>')
s = s[0:last_hr_index]
s.encode('utf-8')
with codecs.open(sys.argv[1], "w", "utf-8-sig") as temp:
    temp.write(s)

haml_fname = "scripts/manpage.haml"
with open(haml_fname, "r") as f:
    haml_template = f.read()

haml = haml_template.replace("__MANPAGE__", sys.argv[1])


(_, tmpfile) = tempfile.mkstemp(suffix='pre')
(_, tmpfile2) = tempfile.mkstemp(suffix='post')
with open(tmpfile, 'w') as f:
    f.write(haml)

call(["haml", tmpfile, tmpfile2])
os.unlink(tmpfile)
shutil.move(tmpfile2, sys.argv[1])
