import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SyntaxHighlighter from 'react-syntax-highlighter';
import styling from "react-syntax-highlighter/dist/cjs/styles/hljs/darcula";
import { deltaDiffHelper } from "components/common/fields/file/diff/delta/deltaDiff.helper";

function StandaloneSourceDeltaDiffFieldBase(
  {
    isLoading,
    delta,
    language,
    sourceCode,
  }) {
  const [beginningAddedLineCount, setBeginningAddedLineCount] = useState(0);
  const [sourceLines, setSourceLines] = useState(undefined);
  const [unpackingDelta, setUnpackingDelta] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    setSourceLines(undefined);

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

  const unpackDelta = async () => {
    setUnpackingDelta(true);
    const originalArray = delta?.target?.lines;
    const position = delta?.target?.position;
    const deltaDiffResponse = deltaDiffHelper.addDeltaContextLines(position, originalArray, sourceCode);
    const sourceLinesArray = deltaDiffResponse?.array;

    if (Array.isArray(sourceLinesArray)) {
      setBeginningAddedLineCount(deltaDiffResponse?.beginningAddedLines);
      let unpackedString = "";

      sourceLinesArray.forEach((line) => {
        if (unpackedString.length > 0) {
          unpackedString += `\n`;
        }

        unpackedString += line;
      });

      setSourceLines(unpackedString);
    }

    setUnpackingDelta(false);
  };

  const getLineNumberStyling = (lineNumber) => {
    const style = {
      display: "block",
      fontSize: "12px",
    };

    const changeLength = delta?.target?.lines?.length;
    if (lineNumber > beginningAddedLineCount && lineNumber < beginningAddedLineCount + changeLength + 1) {
      const type = delta?.type;

      // TODO: Should change be blue?
      if (type === "CHANGE") {
        style.backgroundColor = "rgba(51,51,255,0.5)";
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
        {sourceLines}
      </SyntaxHighlighter>
    </div>
  );
}

StandaloneSourceDeltaDiffFieldBase.propTypes = {
  delta: PropTypes.object,
  isLoading: PropTypes.bool,
  language: PropTypes.string,
  sourceCode: PropTypes.string,
};

StandaloneSourceDeltaDiffFieldBase.defaultProps = {
  language: "javascript",
};

export default StandaloneSourceDeltaDiffFieldBase;