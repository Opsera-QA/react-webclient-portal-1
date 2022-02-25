import _ from "lodash";

export const formatXml = (xml) => {
  const xmlDoc = new DOMParser().parseFromString(xml, 'application/xml');
  const xsltDoc = new DOMParser().parseFromString([
    // describes how we want to modify the XML - indent everything
    '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">',
    '  <xsl:strip-space elements="*"/>',
    '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
    '    <xsl:value-of select="normalize-space(.)"/>',
    '  </xsl:template>',
    '  <xsl:template match="node()|@*">',
    '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
    '  </xsl:template>',
    '  <xsl:output indent="yes"/>',
    '</xsl:stylesheet>',
  ].join('\n'), 'application/xml');

  const xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltDoc);
  const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
  return new XMLSerializer().serializeToString(resultDoc);
};

export const parsePackageXml = (log) => {
  const re = new RegExp(/==== PACKAGE.XML =====((?!==== END PACKAGE.XML =====)[\s\S])*==== END PACKAGE.XML =====/);
  const consoleLog = log?.api_response?.jenkinsConsoleLog ? log?.api_response?.jenkinsConsoleLog : log?.api_response?.jenkins_console_log;

  if (consoleLog == null) {
    return null;
  }

  const matches = re.exec(consoleLog);

  if (matches.length > 0) {
    let xml = matches[0];
    let splitArray = xml.length > 0 ? xml.split("\n") : [];
    if (splitArray.length > 0) {
      splitArray.splice(0, 1);
      splitArray.pop();
    }
    let returnXML = splitArray.length > 0 ? splitArray.join("\n") : [];
    return _xmlFormattingHelper(returnXML);
  }

  return false;
};


// TODO: Is this required or does the XMLFormatter work instead?
export const _xmlFormattingHelper = (data) => {
  try {
    let returnVal = "";
    let indentVal = "";
    data.split(/>\s*</).forEach(function (line) {
      if (line.match(/^\/\w/)) {
        indentVal = indentVal.substring("  ".length);
      }
      returnVal += indentVal + "<" + line + ">\r\n";
      if (line.match(/^<?\w[^>]*[^\/]$/)) {
        indentVal += "  ";
      }
    });
    returnVal = returnVal.substring(1, returnVal.length - 3);
    return returnVal;
  } catch (error) {
    return data;
  }
};

export const lodashClone = (objectToClone) => {
  _.cloneDeep(objectToClone);
};