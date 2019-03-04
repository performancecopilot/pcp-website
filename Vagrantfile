# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "bento/fedora-21"

  # config.vm.network "forwarded_port", guest: 80, host: 8080

  config.vm.network "private_network", ip: "10.1.11.111"
  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.memory = "1024"
  end

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder ".", "/pcp-website"

  config.vm.provision "shell", privileged: false,  inline: <<-SHELL
    sudo yum install -y git ruby rubygem-compass rubygem-haml lynx python rsync publican autoconf \
      avahi-devel bison cairo-devel cyrus-sasl-devel desktop-file-utils flex libibmad-devel \
      libibumad-devel libmicrohttpd-devel ncurses-devel nss-devel perl-ExtUtils-MakeMaker \
      python-devel python3-devel qt-devel readline-devel rpm-devel systemd-devel systemtap-sdt-devel \
      glibc-devel gcc gcc-c++ man2html vim linkchecker python-beautifulsoup4 rubygems python-requests

	gem install sass -v 3.2.19
	gem install sass-globbing

	if [ -d "pcp" ]; then
      cd pcp && git pull --rebase
      cd ..
	else
      git clone https://github.com/performancecopilot/pcp.git
	fi

	if [ ! -L "/usr/share/publican/Common_Content/pcp-brand" ]; then
      sudo ln -s /pcp-website/pcp-brand /usr/share/publican/Common_Content/
	fi

	cd pcp && ./configure --with-books --with-books-brand=pcp-brand && cd books && make
	cd /pcp-website && make
  SHELL
end
