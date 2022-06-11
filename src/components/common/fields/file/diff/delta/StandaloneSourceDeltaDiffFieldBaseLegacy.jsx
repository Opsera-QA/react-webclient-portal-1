import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SyntaxHighlighter from 'react-syntax-highlighter';
import styling from "react-syntax-highlighter/dist/cjs/styles/hljs/darcula";
import { deltaDiffHelper } from "components/common/fields/file/diff/delta/deltaDiff.helper";
import { commitDiffConstants } from "components/common/fields/file/diff/commitDiff.constants";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

function StandaloneSourceDeltaDiffFieldBaseLegacy(
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
    const originalArray = dataParsingHelper.parseArray(delta?.target?.lines, []);
    const position = delta?.target?.position;
    const endPosition = position + originalArray.length;
    const changedArray =  dataParsingHelper.parseArray(delta?.source?.lines, []);
    const unpackedChangedLineCount = Array.isArray(changedArray) ? changedArray.length : 0;
    setChangedLineCount(unpackedChangedLineCount);

    if (unpackedChangedLineCount > 0) {
      originalArray.unshift(...changedArray);
    }

    const deltaDiffResponse = deltaDiffHelper.addDeltaContextLines(
      position,
      originalArray,
      sourceCode,
      endPosition,
    );

    const sourceLinesArray = deltaDiffResponse?.array;

    if (Array.isArray(sourceLinesArray)) {
      setBeginningAddedLineCount(deltaDiffResponse?.beginningAddedLines);
      let unpackedString = "";

      sourceLinesArray.forEach((line) => {
        unpackedString += `${line}\n`;
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

    if (lineNumber > beginningAddedLineCount && lineNumber <= beginningAddedLineCount + changedLineCount) {
      style.backgroundColor = commitDiffConstants.COMMIT_CHANGE_TYPE_COLOR_STRINGS.REMOVED;
    } else if (lineNumber > beginningAddedLineCount + changedLineCount && lineNumber <= beginningAddedLineCount + changedLineCount + changeLength) {
      style.backgroundColor = commitDiffConstants.COMMIT_CHANGE_TYPE_COLOR_STRINGS.ADDED;
    }

    return { style };
  };

  const getBody = () => {
    if (delta == null) {
      return null;
    }

    if (isLoading === true || unpackingDelta === true) {
      return (
        <LoadingDialog size={"sm"} message={"Loading Data"} />
      );
    }

    return (
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
    );
  };

  return (
    <div className={"p-1"}>
      {getBody()}
    </div>
  );
}

StandaloneSourceDeltaDiffFieldBaseLegacy.propTypes = {
  delta: PropTypes.object,
  isLoading: PropTypes.bool,
  language: PropTypes.string,
  sourceCode: PropTypes.string,
};

StandaloneSourceDeltaDiffFieldBaseLegacy.defaultProps = {
  language: "javascript",
};

export default StandaloneSourceDeltaDiffFieldBaseLegacy;