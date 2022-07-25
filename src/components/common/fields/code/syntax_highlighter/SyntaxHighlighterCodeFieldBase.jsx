import React from "react";
import PropTypes from "prop-types";
import { faCode } from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import SyntaxHighlighterFieldBase
  from "components/common/fields/code/syntax_highlighter/SyntaxHighlighterFieldBase";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";

function SyntaxHighlighterCodeFieldBase(
  {
    titleText,
    code,
    className,
    language,
    linePropsFunction,
    wrapLines,
    wrapLongLines,
    showLineNumbers,
    showInlineLineNumbers,
    isLoading,
    backgroundColor,
  }) {
  return (
    <div className={className}>
      <InfoContainer
        titleIcon={faCode}
        titleText={titleText}
        isLoading={isLoading}
        backgroundColor={backgroundColor}
        titleRightSideButton={
          <CopyToClipboardIcon
            copyString={code}
          />
        }
      >
        <SyntaxHighlighterFieldBase
          code={code}
          language={language}
          className={"p-1"}
          wrapLines={wrapLines}
          wrapLongLines={wrapLongLines}
          showLineNumbers={showLineNumbers}
          showInlineLineNumbers={showInlineLineNumbers}
          linePropsFunction={linePropsFunction}
        />
      </InfoContainer>
    </div>
  );
}

SyntaxHighlighterCodeFieldBase.propTypes = {
  titleText: PropTypes.string,
  code: PropTypes.any,
  linePropsFunction: PropTypes.func,
  className: PropTypes.string,
  language: PropTypes.string,
  wrapLines: PropTypes.bool,
  wrapLongLines: PropTypes.bool,
  showLineNumbers: PropTypes.bool,
  showInlineLineNumbers: PropTypes.bool,
  isLoading: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

SyntaxHighlighterCodeFieldBase.defaultProps = {
  wrapLines: true,
  wrapLongLines: true,
  showLineNumbers: false,
  showInlineLineNumbers: false,
  backgroundColor: "rgb(43, 43, 43)",
};

export default SyntaxHighlighterCodeFieldBase;