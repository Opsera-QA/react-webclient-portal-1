import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SyntaxHighlighter from 'react-syntax-highlighter';
import styling from "react-syntax-highlighter/dist/cjs/styles/hljs/darcula";
import { deltaDiffHelper } from "components/common/fields/file/diff/delta/deltaDiff.helper";
import { commitDiffConstants } from "components/common/fields/file/diff/commitDiff.constants";

function StandaloneSourceDeltaDiffFieldBase(
  {
    isLoading,
    delta,
    language,
    sourceCode,
  }) {
  const [beginningAddedLineCount, setBeginningAddedLineCount] = useState(0);
  const [changedLineCount, setChangedLineCount] = useState(0);
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
    const originalArray = [...delta?.target?.lines];
    const position = delta?.target?.position;
    const changedArray =  [...delta?.source?.lines];
    const unpackedChangedLineCount = Array.isArray(changedArray) ? changedArray.length : 0;
    setChangedLineCount(unpackedChangedLineCount);

    if (unpackedChangedLineCount > 0) {
      originalArray.unshift(...changedArray);
    }

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

    if (lineNumber > beginningAddedLineCount && lineNumber < beginningAddedLineCount + changedLineCount + 1) {
      style.backgroundColor = commitDiffConstants.COMMIT_CHANGE_TYPE_COLOR_STRINGS.REMOVED;
    } else if (lineNumber > beginningAddedLineCount + changedLineCount && lineNumber < beginningAddedLineCount + changedLineCount + changeLength + 1) {
      style.backgroundColor = commitDiffConstants.COMMIT_CHANGE_TYPE_COLOR_STRINGS.ADDED;
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