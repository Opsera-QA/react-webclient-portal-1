import React from "react";
import PropTypes from "prop-types";
import {hasStringValue} from "components/common/helpers/string-helpers";

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

    const lowercaseText = text.toLowerCase();
    const lowercaseHighlightText = textToHighlight.toLowerCase();
    const firstIndex = lowercaseText.indexOf(lowercaseHighlightText);

    if (firstIndex === -1) {
      return text;
    }

    const matchTextLength = textToHighlight.length;
    let currentIndex = firstIndex;
    const instances = [];

    while (currentIndex !== -1) {
      const unmatchedText = text.substring(0, currentIndex);
      const endStartIndex = currentIndex + matchTextLength;
      const matchedText = text.substring(currentIndex, endStartIndex);
      currentIndex = lowercaseText.indexOf(lowercaseHighlightText, endStartIndex);

      if (currentIndex === -1) {
        instances.push(
          <span>
            <span>{unmatchedText}</span>
            <span style={{backgroundColor: "yellow", padding: "2px"}}>{matchedText}</span>
          </span>
        );
        continue;
      }

      const postUnmatchedText = text.substring(endStartIndex);
      instances.push(
        <span>
          <span>{unmatchedText}</span>
          <span style={{backgroundColor: "yellow", padding: "2px"}}>{matchedText}</span>
          <span>{postUnmatchedText}</span>
        </span>
      );
    }

    return (
      <div>
        {instances}
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