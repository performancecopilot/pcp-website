PCPGIT  := /home/michele/Devel/pcp
PCPDOCS := $(PCPGIT)/man/html
RSYNC := rsync -azvP --prune-empty-dirs --exclude '*.scss' --exclude '*.haml' \
	--exclude 'Makefile' --exclude 'README' --exclude 'TODO' --exclude 'links.out' \
	--exclude '*.js' --exclude '.git' --exclude '*.swp' --exclude '.sass-cache' \
	--exclude '.gitignore' --exclude 'scripts' --exclude 'README.md' --exclude 'compass' \
	--exclude '*.[1-9]' --exclude 'GNUmakefile' --exclude 'Check' --exclude 'stock-images' \
	--exclude 'pcp-brand' --exclude 'NEWRELEASE'

DSTLOCAL := /srv/pcp.acksyn.org/
DSTREMOTE := webmichele2:/srv/pcp.acksyn.org/
URL := http://pcp.acksyn.org

all: clean import books man docs prep local

local: 
	find . -type f -exec chmod 644 "{}" \;
	find scripts/ -type f -iname '*.sh' -exec chmod 755 "{}" \;
	find scripts/ -type f -iname '*.py' -exec chmod 755 "{}" \;
	$(RSYNC) . $(DSTLOCAL)
	
install: 
	$(RSYNC) --delete $(DSTLOCAL) $(DSTREMOTE)

prep: 
	compass compile -c compass/config.rb -s compressed
	haml index.haml > index.html
	haml features.haml > features.html
	haml team.haml > team.html
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
	./scripts/build-team.py $(PCPGIT) | haml > team.html
	./scripts/easyhacks.py | haml > easyhacks.html

books:
	./scripts/build-books.sh $(PCPGIT)

man:
	./scripts/build-man.sh $(PCPGIT)
	./scripts/create-manindex.py

docs:
	./scripts/build-docs.sh

import:
	mkdir docs man images || /bin/true
	rsync -Lrdp stock-images/* images/
	rsync -Lrdp $(PCPDOCS)/* docs
	rsync -Lrdp $(PCPGIT)/man/* man
	rsync -Lrdp $(PCPGIT)/man/html/images/* images/
	rsync -Lrdp $(PCPGIT)/images/* docs/images
	rm -rf man/html man/retired

uncompressed:
	sass mycss.scss css/uncompressed.css

check:
	linkchecker --check-extern -v $(URL) | grep -v seconds > links.out || /bin/true
	grep "errors found" links.out

checkimages:
	./scripts/check-for-unused-images.py $(DSTLOCAL)

.PHONY: clean man docs books

clean:
	rm -rf *.html docs man books images $(DSTLOCAL) assets/css/*.css || /bin/true
	mkdir $(DSTLOCAL)
