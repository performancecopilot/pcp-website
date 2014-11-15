#!/usr/bin/python

from __future__ import print_function
from subprocess import call
import os
import re
import tempfile

DIR = 'man/'
MAXCOLS = 2

index_template = """
!!! html
%html
  %head
    = Haml::Engine.new(File.read("assets/haml-includes/head.haml")).render

  %body
    = Haml::Engine.new(File.read("assets/haml-includes/navigation.haml")).render

    %div{:class => 'site-content'}
      %div{:class => 'how-to is-typeset'}
        %div{:class => 'row-parent'}
          %div{:class => 'row'}
            %section{:class => 'row__colspaced'}
              %div{:class => 'colspan12-8 push12-2 colspan8-8 colspan6-6 colspan2-1 as-grid with-gutter'}
                %div{:class => 'col__module--cta'}
                  %h2 Man Pages

        %div{:class => 'row-parent'}
          %div{:class => 'row'}
            %section{:class => 'row__colspaced'}
              __REPLACE__

    = Haml::Engine.new(File.read("assets/haml-includes/footer.haml")).render
"""

def print_section(section):
    path = os.path.join(DIR, section)
    manfiles = sorted(os.listdir(path))
    number = section[-1]
    s = """
              %%div{:class => 'colspan12-4 colspan8-3 colspan6-2 colspan2-2 as-grid with-gutter'}
                %%div{:class => 'col__module--img'}
                  %%div{:class => 'manpage'}
                    %%h2 Section %s
                    %%ul
""" % (number)
    for man in manfiles:
        title = re.sub('.\d.html', '', man)
        s += " " * 20 + "  %li\n"
        s += " " * 20 + "    %%a{:href => '%s'} %s\n" % ('/man/%s/%s' % (section, man), title)

    return s

dirs = [j for j in os.listdir(DIR) if os.path.isdir(os.path.join(DIR, j))]
ret = ""
for section in sorted(dirs):
    ret += print_section(section)

text = index_template.replace('__REPLACE__', ret)
(_, tmpfile) = tempfile.mkstemp(suffix='pre')
with open(tmpfile, 'w') as f:
    f.write(text)

index_file = os.path.join(DIR, "index.html")
call(['haml', tmpfile, index_file])
os.unlink(tmpfile)
