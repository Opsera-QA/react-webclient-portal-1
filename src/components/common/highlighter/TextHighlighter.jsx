import React from "react";
import PropTypes from "prop-types";
import {hasStringValue} from "components/common/helpers/string-helpers";

// TODO: This will only highlight the last instance.
//  It was written as a quick replacement for a vulnerable library. If we want to support highlighting multiple instances,
//  talk to Noah and he will implement that support.
function TextHighlighter(
  {
    textToHighlight,
    text,
    className,
  }) {
  const getBody = () => {
    if (hasStringValue(text) !== true) {
      return null;
    }

    if (hasStringValue(textToHighlight) !== true) {
      return text;
    }

    const lastIndex = text.lastIndexOf(textToHighlight);

    if (lastIndex === -1) {
      return text;
    }

    const endStartIndex = lastIndex + textToHighlight.length;
    const firstString = text.substring(0, lastIndex);
    const secondString = text.substring(endStartIndex);

    return (
      <div>
        <span>{firstString}</span>
        <span style={{backgroundColor: "yellow", padding: "2px"}}>{textToHighlight}</span>
        <span>{secondString}</span>
      </div>
    );
  };

  return (
    <span className={className}>
      {getBody()}
    </span>
  );
}

TextHighlighter.propTypes = {
  textToHighlight: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

export default TextHighlighter;