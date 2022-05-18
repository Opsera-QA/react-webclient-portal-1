import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SyntaxHighlighter from 'react-syntax-highlighter';
import styling from "react-syntax-highlighter/dist/cjs/styles/hljs/darcula";
import { deltaDiffHelper } from "components/common/fields/file/diff/delta/deltaDiff.helper";
import { commitDiffConstants } from "components/common/fields/file/diff/commitDiff.constants";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";

function StandaloneSourceDeltaDiffFieldBase(
  {
    isLoading,
    delta,
    language,
    sourceCode,
  }) {
  const [destinationLinesString, setDestinationLinesString] = useState(undefined);
  const [sourceLinesString, setSourceLinesString] = useState(undefined);
  const [topContextLinesString, setTopContextLinesString] = useState(undefined);
  const [bottomContextLinesString, setBottomContextLinesString] = useState(undefined);
  const [unpackingDelta, setUnpackingDelta] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    setSourceLinesString(undefined);
    setTopContextLinesString(undefined);
    setBottomContextLinesString(undefined);
    setDestinationLinesString(undefined);

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
    const sourceLinesArray = dataParsingHelper.parseArray(delta?.target?.lines, []);
    const position = delta?.target?.position;
    const endPosition = position + sourceLinesArray.length;
    const changedArray =  dataParsingHelper.parseArray(delta?.source?.lines, []);
    const newSourceLinesString = dataParsingHelper.parseArrayIntoString(sourceLinesArray);

    if (hasStringValue(newSourceLinesString) === true) {
      setSourceLinesString(newSourceLinesString);
    }

    const newDestinationLinesString = dataParsingHelper.parseArrayIntoString(changedArray);

    if (hasStringValue(newDestinationLinesString) === true) {
      setDestinationLinesString(newDestinationLinesString);
    }

    const deltaDiffResponse = deltaDiffHelper.getDeltaContextLines(
      position,
      sourceCode,
      endPosition,
    );

    const newTopContextLinesString = dataParsingHelper.parseArrayIntoString(deltaDiffResponse?.topContextLines);

    if (hasStringValue(newTopContextLinesString) === true) {
      setTopContextLinesString(newTopContextLinesString);
    }

    const newBottomContextLinesString = dataParsingHelper.parseArrayIntoString(deltaDiffResponse?.bottomContextLines);

    if (hasStringValue(newBottomContextLinesString) === true) {
      setBottomContextLinesString(newBottomContextLinesString);
    }

    setUnpackingDelta(false);
  };

  const getTopContextLineSyntaxHighlighter = () => {
    if (hasStringValue(topContextLinesString) === true) {
      return (
        <SyntaxHighlighter
          style={styling}
          language={language}
          lineProps={deltaDiffHelper.getLineNumberStyling}
          wrapLines={true}
          wrapLongLines={true}
          showLineNumbers={false}
          showInlineLineNumbers={false}

        >
          {topContextLinesString}
        </SyntaxHighlighter>
      );
    }
  };

  const getDestinationLinesSyntaxHighlighter = () => {
    if (hasStringValue(destinationLinesString) === true) {
      return (
        <SyntaxHighlighter
          style={styling}
          language={language}
          lineProps={deltaDiffHelper.getRemovedLinesStyling}
          wrapLines={true}
          wrapLongLines={true}
          showLineNumbers={false}
          showInlineLineNumbers={false}
        >
          {destinationLinesString}
        </SyntaxHighlighter>
      );
    }
  };

  const getSourceLinesSyntaxHighlighter = () => {
    if (hasStringValue(sourceLinesString) === true) {
      return (
        <SyntaxHighlighter
          style={styling}
          language={language}
          lineProps={deltaDiffHelper.getAddedLinesStyling}
          wrapLines={true}
          wrapLongLines={true}
          showLineNumbers={false}
          showInlineLineNumbers={false}
        >
          {sourceLinesString}
        </SyntaxHighlighter>
      );
    }
  };

  const getBottomContextLineSyntaxHighlighter = () => {
    if (hasStringValue(bottomContextLinesString) === true) {
      return (
        <SyntaxHighlighter
          style={styling}
          language={language}
          wrapLines={true}
          wrapLongLines={true}
          showLineNumbers={false}
          showInlineLineNumbers={false}
          lineProps={deltaDiffHelper.getLineNumberStyling}
        >
          {bottomContextLinesString}
        </SyntaxHighlighter>
      );
    }
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
      <>
        {getTopContextLineSyntaxHighlighter()}
        {getDestinationLinesSyntaxHighlighter()}
        {getSourceLinesSyntaxHighlighter()}
        {getBottomContextLineSyntaxHighlighter()}
      </>
    );
  };

  return (
    <div className={"p-1"}>
      {getBody()}
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