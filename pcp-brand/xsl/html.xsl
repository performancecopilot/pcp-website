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
<xsl:import href="../../../xsl/html.xsl"/>
<xsl:import href="common.xsl"/>

<xsl:template name="user.head.content">
  <!--
      Paths to document() are relative to the xml build directory under $book/tmp
      Not the location of this xslt
  -->
   <xsl:variable name="codefile1" select="document('/usr/share/publican/Common_Content/pcp-brand/xsl/header.html',/)"/>
   <xsl:copy-of select="$codefile1/htmlcode/node()"/>
</xsl:template>

<xsl:template name="user.header.navigation">
   <xsl:variable name="codefile2" select="document('/usr/share/publican/Common_Content/pcp-brand/xsl/navigation.html',/)"/>
   <xsl:copy-of select="$codefile2/htmlcode/node()"/>
</xsl:template>

<xsl:template name="user.footer.navigation">
   <xsl:variable name="codefile4" select="document('/usr/share/publican/Common_Content/pcp-brand/xsl/footer.html',/)"/>
   <xsl:copy-of select="$codefile4/htmlcode/node()"/>
</xsl:template>

<!--
From: /usr/share/publican/html.xsl
Reason: Add needed DIVs
Version:
-->
<xsl:template name="chunk-element-content">
  <xsl:param name="prev"/>
  <xsl:param name="next"/>
  <xsl:param name="nav.context"/>
  <xsl:param name="content">
    <xsl:apply-imports/>
  </xsl:param>

  <xsl:call-template name="user.preroot"/>

  <html>
    <xsl:call-template name="html.head">
      <xsl:with-param name="prev" select="$prev"/>
      <xsl:with-param name="next" select="$next"/>
    </xsl:call-template>

    <body>
      <xsl:call-template name="body.attributes"/>
      <xsl:if test="$embedtoc != 0">
        <div id="navigation"></div>
        <div id="floatingtoc" class="hidden"></div>
      </xsl:if>
      <xsl:call-template name="user.header.navigation"/>
      <div class='site-content'>
	<div class='how-to is-typeset'>
	  <div class='row-parent'>
           <div class='row'>
        <xsl:call-template name="header.navigation">
        <xsl:with-param name="prev" select="$prev"/>
        <xsl:with-param name="next" select="$next"/>
        <xsl:with-param name="nav.context" select="$nav.context"/>
      </xsl:call-template>

      <xsl:call-template name="user.header.content"/>

      <xsl:copy-of select="$content"/>

      <xsl:call-template name="user.footer.content"/>

      <xsl:call-template name="footer.navigation">
        <xsl:with-param name="prev" select="$prev"/>
        <xsl:with-param name="next" select="$next"/>
        <xsl:with-param name="nav.context" select="$nav.context"/>
      </xsl:call-template>
            </div>
          </div>
        </div>
      </div>

      <xsl:call-template name="user.footer.navigation"/>
    </body>
  </html>
  <xsl:value-of select="$chunk.append"/>
</xsl:template>

</xsl:stylesheet>
