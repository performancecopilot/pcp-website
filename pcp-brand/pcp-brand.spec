%define brand pcp-brand
%define wwwdir /var/www/html/docs

Name:		publican-pcp-brand
Summary:	Common documentation files for %{brand}
Version:	0.1
Release:	0%{?dist}
License:	SETUP: Set This
Group:		Applications/Text
Buildroot:	%{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
Buildarch:	noarch
Source:		https://www.SETUP.set.me.example.com/source/%{name}-%{version}.tgz
Requires:	publican
BuildRequires:	publican
URL:		https://www.SETUP.set.me.example.com

%description
This package provides common files and templates needed to build documentation
for %{brand} with publican.

%package web
Summary:        Web styles for the %{brand} brand
Group:          Documentation
Requires:	publican

%description web
Web Site common files for the %{brand} brand.

%prep
%setup -q 

%build
publican build --formats=xml --langs=all --publish

%install
rm -rf $RPM_BUILD_ROOT
mkdir -p -m755 $RPM_BUILD_ROOT%{_datadir}/publican/Common_Content
publican install_brand --path=$RPM_BUILD_ROOT%{_datadir}/publican/Common_Content
mkdir -p -m755 $RPM_BUILD_ROOT/%{wwwdir}/%{brand}
publican install_brand --web --path=$RPM_BUILD_ROOT/%{wwwdir}/%{brand}


%clean
rm -rf $RPM_BUILD_ROOT

%files
%defattr(-,root,root,-)
%doc README
%doc COPYING
%{_datadir}/publican/Common_Content/%{brand}

%files web
%defattr(-,root,root,-)
%{wwwdir}/%{brand}

%changelog
* Thu Nov 13 2014  SETUP:YourName <SETUP:your.email@example.com> 0.1
- Created Brand

