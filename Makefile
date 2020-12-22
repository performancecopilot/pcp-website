URL = https://pcp.io
WEB = pcp-website.github.io
PCP = ../pcp

RSYNC := rsync -azvPL --prune-empty-dirs --exclude '*.haml' \
        --exclude GNUmakefile --exclude Makefile --exclude '*.swp' \
        --exclude '.git' --exclude '.github' --exclude '.gitignore'
LDIRT = links.out

HAMLFILES = \
	index features documentation community team website faq \
	presentations glider screenshots download testimonials \
	gsoc/2015/ideas gsoc/2016/ideas gsoc/2017/ideas gsoc/2018/ideas \
	gsoc/2019/ideas gsoc/2020/ideas \
	gsod/2019/ideas gsod/2020/ideas \
	conference/2018/home conference/2018/contact conference/2018/schedule \
	conference/2019/home conference/2019/contact conference/2019/schedule \

REFERERS = slides release

all: clean default

default: 
	rm -f docs/favicon.ico
	ln -s images/pcp.ico docs/favicon.ico
	compass compile -c compass/config.rb -s compressed
	for h in `echo $(HAMLFILES)`; do \
	    haml $$h.haml > docs/$$h.html; \
	done
	for r in `echo $(REFERERS)`; do \
	    $(RSYNC) $$r/index.html docs/$$r; \
	done
	test -d $(PCP)/images && $(RSYNC) $(PCP)/images .
	test -d $(PCP)/man/html && $(RSYNC) $(PCP)/man/html/* docs/docs
	$(RSYNC) CNAME images snaps assets papers docs
	git add docs
	git status

uncompressed:
	sass mycss.scss css/uncompressed.css

check:
	linkchecker --check-extern -v $(URL) | grep -v seconds > links.out || /bin/true
	grep "errors found" links.out

.PHONY: clean

clean:
	rm -rf $(LDIRT) || /bin/true
