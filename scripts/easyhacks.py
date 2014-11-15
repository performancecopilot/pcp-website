#!/usr/bin/python

from __future__ import print_function
import subprocess
import xml.etree.ElementTree as ET

BUGSURL = "http://oss.sgi.com/bugzilla/buglist.cgi?bug_status=UNCONFIRMED&amp;bug_status=NEW&amp;bug_status=ASSIGNED&amp;bug_status=REOPENED&amp;bug_status=VERIFIED&amp;component=pcp&amp;keywords=EasyFix%2C%20&amp;keywords_type=allwords&amp;list_id=2509&amp;product=pcp&amp;query_format=advanced&amp;title=Bug List&amp;ctype=atom"

# For some reason via urllib2 I get text/html instead of text/atom even though
# I think the headers were set up correctly. No time to fix this nicely, use lynx
def get_buglist():
    """returns dictionary { bug_nr: [title, url], ...}"""
    ret = subprocess.check_output(['lynx','-dump', BUGSURL])
    xmldoc = ET.fromstring(ret)
    bugs = {}
    for entry in xmldoc.getchildren():
        if not entry.tag.endswith('entry'):
            continue
        title = None
        bz_url = None
        for child in entry.getchildren():
            if child.tag.endswith('title'):
                title = child.text
            if child.tag.endswith('id'):
                bz_url = child.text
                bz_id = int(bz_url.split('=')[1])

        if title and bz_url:
            bugs[bz_id] = (title, bz_url)
    return bugs

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
                  %h2 Easy Hacks
                  %p This is a list of easy to fix bugs. Contact the Mailing List and a mentor will be assigned to you:

        %div{:class => 'row-parent'}
          %div{:class => 'row'}
            %section{:class => 'row__colspaced'}
              %div{:class => 'colspan12-12 colspan8-8 colspan6-6 colspan2-2 as-grid with-gutter'}
                %div{:class => 'col__module--img'}
                  %ul
__COLUMN1__

    = Haml::Engine.new(File.read("assets/haml-includes/footer.haml")).render
'''

def indent_bugs(bugs):
    indent = ' ' * 20
    s1 = ''
    for bz in sorted(bugs.keys()):
        s1 += '%s%%li\n' % indent
        s1 += '%s  %%a{:href=>"%s"} %s\n' % (indent, bugs[bz][1], bugs[bz][0])
    return s1

if __name__ == '__main__':
    bugs = get_buglist()
    txt = indent_bugs(bugs)
    print(template.replace('__COLUMN1__', txt))
