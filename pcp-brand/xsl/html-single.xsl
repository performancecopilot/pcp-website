<?xml version='1.0'?>
 
<!--
        Copyright 2009 Andrew Beekhof
        License: GPL
        Author: Andrew Beekhof <andrew@beekhof.net>
-->

<!DOCTYPE xsl:stylesheet [
<!ENTITY lowercase "'abcdefghijklmnopqrstuvwxyz'">
<!ENTITY uppercase "'ABCDEFGHIJKLMNOPQRSTUVWXYZ'">
 ]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version='1.0'
                xmlns="http://www.w3.org/TR/xhtml1/transitional"
                xmlns:fo="http://www.w3.org/1999/XSL/Format"
                exclude-result-prefixes="#default">

<xsl:import href="http://docbook.sourceforge.net/release/xsl/current/fo/docbook.xsl"/>
<xsl:import href="http://docbook.sourceforge.net/release/xsl/current/fo/graphics.xsl"/>
<xsl:import href="../../../xsl/html-single.xsl"/>
<xsl:import href="common.xsl"/>

<xsl:template name="user.head.content">
  <!--
      Paths to document() are relative to the xml build directory under $book/tmp
      Not the location of this xslt
  -->
   <xsl:variable name="codefile1" select="document('/usr/share/publican/Common_Content/pcp-brand/xsl/header.html',/)"/>
   <xsl:copy-of select="$codefile1/htmlcode/node()"/>
</xsl:template>

<xsl:template name="user.header.content">
   <xsl:variable name="codefile2" select="document('/usr/share/publican/Common_Content/pcp-brand/xsl/navigation.html',/)"/>
   <xsl:copy-of select="$codefile2/htmlcode/node()"/>
</xsl:template>

<xsl:template name="user.footer.content">
   <xsl:variable name="codefile4" select="document('/usr/share/publican/Common_Content/pcp-brand/xsl/footer.html',/)"/>
   <xsl:copy-of select="$codefile4/htmlcode/node()"/>
</xsl:template>

<!--
From: /usr/share/publican/xsl/html-single.xsl
Reason: add divs web site
Version:
-->

<xsl:template match="*" mode="process.root">
  <xsl:variable name="doc" select="self::*"/>

  <xsl:call-template name="user.preroot"/>
  <xsl:call-template name="root.messages"/>

  <xsl:choose>
    <xsl:when test="$body.only != 0">
      <xsl:apply-templates select="."/>
    </xsl:when>
    <xsl:otherwise>
  <html>
    <head>
      <xsl:call-template name="system.head.content">
        <xsl:with-param name="node" select="$doc"/>
      </xsl:call-template>
      <xsl:call-template name="head.content">
        <xsl:with-param name="node" select="$doc"/>
      </xsl:call-template>
      <xsl:call-template name="user.head.content">
        <xsl:with-param name="node" select="$doc"/>
      </xsl:call-template>
    </head>
    <body>
      <xsl:call-template name="body.attributes"/>
     <xsl:call-template name="user.header.content">
        <xsl:with-param name="node" select="$doc"/>
      </xsl:call-template>
        <div class='site-content'>
	  <div class='how-to is-typeset'>
	    <div class='row-parent'>
              <div class='row'>
      <xsl:if test="$embedtoc != 0">
        <div id="navigation"></div>
        <div id="floatingtoc" class="hidden"></div>
      </xsl:if>
      <xsl:if test="$embedtoc = 0 or $web.type = ''">
      <p xmlns="http://www.w3.org/1999/xhtml">
        <xsl:attribute name="id">
           <xsl:text>title</xsl:text>
        </xsl:attribute>
        <a class="left">
          <xsl:attribute name="href">
              <xsl:value-of select="$prod.url"/>
          </xsl:attribute>
	  <img alt="Product Site">
		<xsl:attribute name="src">
			<xsl:value-of select="$admon.graphics.path"/><xsl:text>/image_left.png</xsl:text>
		</xsl:attribute>
	  </img>
        </a>
        <a class="right">
          <xsl:attribute name="href">
            <xsl:value-of select="$doc.url"/>
          </xsl:attribute>
	  <img alt="Documentation Site">
		<xsl:attribute name="src">
			<xsl:value-of select="$admon.graphics.path"/><xsl:text>/image_right.png</xsl:text>
		</xsl:attribute>
	  </img>
        </a>
      </p>
      </xsl:if>
    <xsl:if test="$embedtoc != 0 and $web.type = ''">
      <ul class="docnav" xmlns="http://www.w3.org/1999/xhtml">
        <li class="home"><xsl:value-of select="$clean_title"/></li>
      </ul>
    </xsl:if>
      <xsl:apply-templates select="."/>
            </div>
          </div>
        </div>
      </div>
      <xsl:call-template name="user.footer.content">
        <xsl:with-param name="node" select="$doc"/>
      </xsl:call-template>
    </body>
  </html>
  <xsl:value-of select="$html.append"/>
     </xsl:otherwise>
  </xsl:choose>
</xsl:template>
</xsl:stylesheet>
