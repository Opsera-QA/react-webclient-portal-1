import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SyntaxHighlighter from 'react-syntax-highlighter';
import styling from "react-syntax-highlighter/dist/cjs/styles/hljs/darcula";

function StandaloneSourceDeltaDiffFieldBase(
  {
    isLoading,
    delta,
    language,
    sourceCode,
    destinationCode,
  }) {
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
    const sourceLinesArray = delta?.source?.lines;

    if (Array.isArray(sourceLinesArray)) {
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

    const type = delta?.type;
    const position = delta?.source?.position;

    // TODO: Should change be blue?
    // if (type === "CHANGE") {
    //   style.backgroundColor = "rgba(51,51,255,0.1)";
    // } else

    if (type === "INSERT" || type === "CHANGE") {
      style.backgroundColor = "rgba(51,255,51,0.1)";
    } else if (type === "DELETE") {
      style.backgroundColor = "rgba(255,51,51,0.2)";
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
  destinationCode: PropTypes.string,
};

StandaloneSourceDeltaDiffFieldBase.defaultProps = {
  language: "javascript",
  visibleCodeOption: "changed",
};

export default StandaloneSourceDeltaDiffFieldBase;