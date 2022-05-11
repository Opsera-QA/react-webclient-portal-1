import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SyntaxHighlighter from 'react-syntax-highlighter';
import styling from "react-syntax-highlighter/dist/cjs/styles/hljs/darcula";
import { hasStringValue } from "components/common/helpers/string-helpers";

function StandaloneDestinationDeltaDiffFieldBase(
  {
    isLoading,
    delta,
    language,
    sourceCode,
    destinationCode,
  }) {
  const [beginningAddedLineCount, setBeginningAddedLineCount] = useState(0);
  const [endAddedLineCount, setEndAddedLineCount] = useState(0);
  const [destinationLines, setDestinationLines] = useState(undefined);
  const [unpackingDelta, setUnpackingDelta] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    setDestinationLines(undefined);

    if (delta) {
      unpackDelta().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [delta]);

  console.log("sourceCode: " + JSON.stringify(sourceCode));

  const unpackDelta = async () => {
    setUnpackingDelta(true);
    const destinationLinesArray = delta?.target?.lines;
    const position = delta?.target?.position;
    const endPosition = position + destinationLinesArray?.length;
    console.log("endPosition: " + endPosition);

    const lines =
      hasStringValue(destinationCode, false)
        ? destinationCode.split("\n")
        : undefined;

    if (Array.isArray(destinationLinesArray)) {
      if (Array.isArray(lines) && position >= 1) {
        let beginningAddedLines = 0;
        for (let i = position - 1; i >= 0 && i >= position - 5 && i < lines.length; i--) {
          const line = hasStringValue(lines[i]) === true ? lines[i] : "";
          beginningAddedLines++;
          destinationLinesArray.unshift(line);
        }
        setBeginningAddedLineCount(beginningAddedLines);

        let endAddedLines = 0;
        for (let i = endPosition + 1; i < lines.length && i <= endPosition + 5; i++) {
          const line = hasStringValue(lines[i]) === true ? lines[i] : "";
            endAddedLines++;
            destinationLinesArray.push(line);
        }
        setEndAddedLineCount(endAddedLines);
      }

      let unpackedString = "";

      destinationLinesArray.forEach((line) => {
        if (unpackedString.length > 0) {
          unpackedString += `\n`;
        }

        unpackedString += line;
      });

      setDestinationLines(unpackedString);
    }
    setUnpackingDelta(false);
  };

  const getLineNumberStyling = (lineNumber) => {
    const style = {
      display: "block",
      fontSize: "12px",
    };

    const changeLength = delta?.target?.lines?.length;
    if (lineNumber > beginningAddedLineCount && lineNumber < beginningAddedLineCount + changeLength) {
      const type = delta?.type;

      // TODO: Should change be blue?
      if (type === "CHANGE") {
        style.backgroundColor = "rgba(51,51,255,0.1)";
      } else if (type === "INSERT") {
        style.backgroundColor = "rgba(51,255,51,0.1)";
      } else if (type === "DELETE") {
        style.backgroundColor = "rgba(255,51,51,0.2)";
      }
    }

    return { style };
  };

  if (delta == null) {
    return null;
  }

  if (isLoading === true || unpackingDelta === true) {
    return (
      <LoadingDialog size={"sm"} message={"Loading Data"} />
    );
  }

  return (
    <div className={"p-1"}>
      <SyntaxHighlighter
        style={styling}
        lineProps={(lineNumber) => getLineNumberStyling(lineNumber)}
        language={language}
        wrapLines={true}
        wrapLongLines={true}
        showLineNumbers={true}
        showInlineLineNumbers={true}
      >
        {destinationLines}
      </SyntaxHighlighter>
    </div>
  );
}

StandaloneDestinationDeltaDiffFieldBase.propTypes = {
  delta: PropTypes.object,
  isLoading: PropTypes.bool,
  language: PropTypes.string,
  visibleCodeOption: PropTypes.string,
  sourceCode: PropTypes.string,
  destinationCode: PropTypes.string,
};

StandaloneDestinationDeltaDiffFieldBase.defaultProps = {
  language: "javascript",
  visibleCodeOption: "changed",
};

export default StandaloneDestinationDeltaDiffFieldBase;