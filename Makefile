PCPGIT  := /home/vagrant/pcp
DSTLOCAL := /pcp-website/generated-pcp-website/
DSTREMOTE = www.pcp.io:/oss/www/projects/pcp
URL = http://www.pcp.io
-include ./localdefs

RSYNC := rsync -azvP --prune-empty-dirs --exclude '*.scss' --exclude '*.haml' \
	--exclude 'Makefile' --exclude 'README' --exclude 'TODO' --exclude 'links.out' \
	--exclude '.git' --exclude '*.swp' --exclude '.sass-cache' \
	--exclude '.gitignore' --exclude 'scripts' --exclude 'README.md' --exclude 'compass' \
	--exclude '*.[1-9]' --exclude 'GNUmakefile' --exclude 'Check' --exclude 'stock-images' \
	--exclude 'pcp-brand' --exclude 'NEWRELEASE' --exclude 'pcp.git' --exclude 'pcp-gui.git' \
	--exclude 'srpm' --exclude 'buildbot' --exclude 'Vagrantfile' --exclude '.vagrant'

REDIRECTS = boards builds roadmap
HAMLFILES = index features documentation community website faq buildbot \
	    presentations glider screenshots download testimonials \
	    gsoc/2015/ideas gsoc/2016/ideas \

all: clean import books man docs prep local

local: 
	find . -type f -exec chmod 644 "{}" \;
	find scripts/ -type f -iname '*.sh' -exec chmod 755 "{}" \;
	find scripts/ -type f -iname '*.py' -exec chmod 755 "{}" \;
	$(RSYNC) . $(DSTLOCAL)

install: 
	$(RSYNC) $(DSTLOCAL) $(DSTREMOTE)

prep: 
	compass compile -c compass/config.rb -s compressed
	@for r in `echo $(REDIRECTS)`; do \
	    haml $$r.haml > $$r; \
	done
	@for h in `echo $(HAMLFILES)`; do \
	    haml $$h.haml > $$h.html; \
	done
	./scripts/build-team.py $(PCPGIT) | haml > team.html
	./scripts/easyhacks.py | haml > easyhacks.html

books:
	./scripts/build-books.sh $(PCPGIT)

man:
	./scripts/build-man.sh $(PCPGIT)
	./scripts/create-manindex.py

docs:
	./scripts/build-docs.sh

PG_PDF = ../books/PCP_PG/pdf/PCP-3-pcp-programmers-guide-en-US.pdf
UAG_PDF = ../books/PCP_UAG/pdf/PCP-3-pcp-users-and-administrators-guide-en-US.pdf

import:
	mkdir doc docs man images 2>/dev/null || /bin/true
	rsync -Lrdp stock-images/* images/
	rsync -Lrdp $(PCPGIT)/man/html/* docs/
	rsync -Lrdp $(PCPGIT)/man/* man
	rsync -Lrdp $(PCPGIT)/man/html/images/* images/
	rsync -Lrdp $(PCPGIT)/images/* docs/images
	rm -rf man/html man/retired
	cd doc && ln -s $(UAG_PDF) pcp-users-and-administrators-guide.pdf
	cd doc && ln -s $(PG_PDF) pcp-programmers-guide.pdf
	ln -s images/pcp.ico favicon.ico

uncompressed:
	sass mycss.scss css/uncompressed.css

check:
	linkchecker --check-extern -v $(URL) | grep -v seconds > links.out || /bin/true
	grep "errors found" links.out

checkimages:
	./scripts/check-for-unused-images.py $(DSTLOCAL)

.PHONY: clean man docs books

clean:
	rm -rf *.html doc docs man books images favicon.ico $(DSTLOCAL)/* assets/css/*.css || /bin/true
	mkdir $(DSTLOCAL) 2>/dev/null || /bin/true
