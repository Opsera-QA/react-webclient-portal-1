import React from "react";
import PropTypes from "prop-types";
import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import xml from "react-syntax-highlighter/dist/cjs/languages/hljs/xml";
import styling from "react-syntax-highlighter/dist/cjs/styles/hljs/darcula";

SyntaxHighlighter.registerLanguage("xml", xml);

function SyntaxHighlighterFieldBase(
  {
    code,
    className,
    language,
    linePropsFunction,
    wrapLines,
    wrapLongLines,
    showLineNumbers,
    showInlineLineNumbers,
  }) {
  return (
    <div className={className}>
      <SyntaxHighlighter
        style={styling}
        language={language}
        lineProps={linePropsFunction}
        wrapLines={wrapLines}
        wrapLongLines={wrapLongLines}
        showLineNumbers={showLineNumbers}
        showInlineLineNumbers={showInlineLineNumbers}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

SyntaxHighlighterFieldBase.propTypes = {
  code: PropTypes.any,
  linePropsFunction: PropTypes.func,
  className: PropTypes.string,
  language: PropTypes.string,
  wrapLines: PropTypes.bool,
  wrapLongLines: PropTypes.bool,
  showLineNumbers: PropTypes.bool,
  showInlineLineNumbers: PropTypes.bool,
};

SyntaxHighlighterFieldBase.defaultProps = {
  wrapLines: true,
  wrapLongLines: true,
  showLineNumbers: false,
  showInlineLineNumbers: false,
};

export default SyntaxHighlighterFieldBase;