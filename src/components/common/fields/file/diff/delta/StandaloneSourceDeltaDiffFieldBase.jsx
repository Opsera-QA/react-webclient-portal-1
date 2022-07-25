import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import { deltaDiffHelper } from "components/common/fields/file/diff/delta/deltaDiff.helper";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import SyntaxHighlighterFieldBase from "components/common/fields/code/syntax_highlighter/SyntaxHighlighterFieldBase";

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
        <SyntaxHighlighterFieldBase
          code={topContextLinesString}
          language={language}
          linePropsFunction={deltaDiffHelper.getLineNumberStyling}
          wrapLines={true}
          wrapLongLines={true}
          showLineNumbers={false}
          showInlineLineNumbers={false}
        />
      );
    }
  };

  const getDestinationLinesSyntaxHighlighter = () => {
    if (hasStringValue(destinationLinesString) === true) {
      return (
        <SyntaxHighlighterFieldBase
          code={destinationLinesString}
          language={language}
          linePropsFunction={deltaDiffHelper.getRemovedLinesStyling}
          wrapLines={true}
          wrapLongLines={true}
          showLineNumbers={false}
          showInlineLineNumbers={false}
        />
      );
    }
  };

  const getSourceLinesSyntaxHighlighter = () => {
    if (hasStringValue(sourceLinesString) === true) {
      return (
        <SyntaxHighlighterFieldBase
          code={sourceLinesString}
          language={language}
          linePropsFunction={deltaDiffHelper.getAddedLinesStyling}
          wrapLines={true}
          wrapLongLines={true}
          showLineNumbers={false}
          showInlineLineNumbers={false}
        />
      );
    }
  };

  const getBottomContextLineSyntaxHighlighter = () => {
    if (hasStringValue(bottomContextLinesString) === true) {
      return (

        <SyntaxHighlighterFieldBase
          code={bottomContextLinesString}
          language={language}
          linePropsFunction={deltaDiffHelper.getLineNumberStyling}
          wrapLines={true}
          wrapLongLines={true}
          showLineNumbers={false}
          showInlineLineNumbers={false}
        />
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