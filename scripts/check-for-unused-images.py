#!/usr/bin/python

from __future__ import print_function
import subprocess
import os
import sys

dest = os.path.join(sys.argv[1], 'images')
if not os.path.isdir(dest):
    print("%s does not exist" % dest)
    sys.exit(-1)

# this list contains all the used
# linkchecker -v http://pcp.acksyn.org > links.out
ret = subprocess.check_output(["sh", "-c", "grep ^URL links.out|grep images|sort|uniq |perl -p -e 's,/images,images,' | cut -f2 -d\/ |cut -f1 -d\\'"])
images = sorted([i for i in ret.split('\n') if len(i) >= 1])

existing = []
nonexisting = []
for f in sorted(images):
    path = os.path.join(dest, f)
    if os.path.isfile(path):
        existing.append(f)
    else:
        nonexisting.append(f)

print(existing)

print("The following %s images have a link but do not exist: %s" % (len(nonexisting), nonexisting))
s = ''
pre = '~/Devel/pcp/man/html/images'
for i in nonexisting:
    s += "%s/%s " % (pre, i)
print("cp %s %s" % (s, 'images/'))
#counter = 0
#for i in unused:
#    path = os.path.join(dest, i)
#    if os.path.isfile(path):
#        os.unlink(path)
#        counter += 1
#print("Removed %s files" % counter)
