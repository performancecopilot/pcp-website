PCPGIT  := /home/michele/Devel/pcp
DSTLOCAL := /srv/pcp.acksyn.org/
DSTREMOTE := webmichele2:/srv/pcp.acksyn.org/
URL := http://pcp.acksyn.org
-include ./localdefs

RSYNC := rsync -azvP --prune-empty-dirs --exclude '*.scss' --exclude '*.haml' \
	--exclude 'Makefile' --exclude 'README' --exclude 'TODO' --exclude 'links.out' \
	--exclude '.git' --exclude '*.swp' --exclude '.sass-cache' \
	--exclude '.gitignore' --exclude 'scripts' --exclude 'README.md' --exclude 'compass' \
	--exclude '*.[1-9]' --exclude 'GNUmakefile' --exclude 'Check' --exclude 'stock-images' \
	--exclude 'pcp-brand' --exclude 'NEWRELEASE' --exclude 'pcp.git' --exclude 'pcp-gui.git' \
	--exclude 'srpm' --exclude 'buildbot'

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
	haml index.haml > index.html
	haml features.haml > features.html
	haml documentation.haml > documentation.html
	haml community.haml > community.html
	haml website.haml > website.html
	haml faq.haml > faq.html
	haml news.haml > news.html
	haml old_news.haml > old_news.html
	haml presentations.haml > presentations.html
	haml glider.haml > glider.html
	haml screenshots.haml > screenshots.html
	haml download.haml > download.html
	haml testimonials.haml > testimonials.html
	haml gsoc/2015/ideas.haml > gsoc/2015/ideas.html
	haml buildbot.haml > buildbot.html
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
