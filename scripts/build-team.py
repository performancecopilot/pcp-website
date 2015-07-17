#!/usr/bin/python

from __future__ import print_function
import subprocess
import sys

def get_authors_haml_columns(authors):
    x = len(authors) / 2
    a = authors[:x]
    b = authors[x:]
    indent = ' ' * 20
    s1 = ''
    s2 = ''
    for i in a:
        author = i.strip()
        if len(author) < 1:
            continue
        s1 += '%s%%li %s\n' % (indent, author)
    for i in b:
        author = i.strip()
        if len(author) < 1:
            continue
        s2 += '%s%%li %s\n' % (indent, author)
    return (s1, s2)

ret = subprocess.check_output(["sh", "-c", "git -C %s log --pretty=format:'%%an' | egrep -v 'pcpqa|unknown|EC2' | sort | uniq | sort" % sys.argv[1]])

authors = ret.split('\n')
(col1, col2) = get_authors_haml_columns(authors)

template = '''
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
              %div{:class => 'logo colspan12-12 colspan8-8 colspan6-6 colspan2-2 as-grid with-gutter'}
            %section{:class => 'row__colspaced'}
              %div{:class => 'colspan12-8 push12-2 colspan8-8 colspan6-6 colspan2-1 as-grid with-gutter'}
                %div{:class => 'col__module--cta'}
                  %h2 Team
                  %p Performance Co-Pilot is brought to you by the following people.

        %div{:class => 'row-parent'}
          %div{:class => 'row'}
            %section{:class => 'row__colspaced'}
              %div{:class => 'colspan12-6 colspan8-4 colspan6-3 colspan2-2 as-grid with-gutter'}
                %div{:class => 'col__module--cta'}
                  %ul
__COLUMN1__

              %div{:class => 'colspan12-6 colspan8-4 colspan6-3 colspan2-2 as-grid with-gutter'}
                %div{:class => 'col__module--cta'}
                  %ul
__COLUMN2__

    = Haml::Engine.new(File.read("assets/haml-includes/footer.haml")).render
'''

t1 = template.replace('__COLUMN1__', col1)
t2 = t1.replace('__COLUMN2__', col2)
print(t2)
