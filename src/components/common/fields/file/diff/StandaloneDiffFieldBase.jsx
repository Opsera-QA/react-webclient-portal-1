import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { diffHelper } from "utils/diff.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import SyntaxHighlighter from 'react-syntax-highlighter';
import styling from "react-syntax-highlighter/dist/cjs/styles/hljs/darcula";
import { commitDiffConstants } from "components/common/fields/file/diff/commitDiff.constants";

export const VISIBLE_CODE_OPTIONS = {
  ORIGINAL: "original",
  CHANGED: "changed",
};

function StandaloneDiffFieldBase(
  {
    isLoading,
    originalCode,
    changedCode,
    language,
    visibleCodeOption,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [unpackingDiff, setUnpackingDiff] = useState(false);
  const [diffLineNumbers, setDiffLineNumbers] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    setDiffLineNumbers(undefined);

    if (hasStringValue(originalCode, false) === true && hasStringValue(changedCode, false) === true) {
      calculateDiffLineNumbers().catch((error) => {
        console.error(error);
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [originalCode, changedCode]);

  const calculateDiffLineNumbers = async () => {
    try {
      setUnpackingDiff(true);
      setDiffLineNumbers(diffHelper.getSeparatedDiffLineNumbers(originalCode, changedCode));
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setUnpackingDiff(false);
      }
    }
  };

  const getLineNumberStyling = (lineNumber) => {
    const style = {
      display: "block",
    };
    const diffObject = visibleCodeOption === VISIBLE_CODE_OPTIONS.ORIGINAL ? diffLineNumbers?.firstString : diffLineNumbers?.secondString;
    const insertedLineNumbers = diffObject?.insertedLineNumbers;
    const deletedLineNumbers = diffObject?.deletedLineNumbers;

    if (Array.isArray(insertedLineNumbers) && insertedLineNumbers.includes(lineNumber)) {
      style.backgroundColor = commitDiffConstants.COMMIT_CHANGE_TYPE_COLOR_STRINGS.ADDED;
    } else if (Array.isArray(deletedLineNumbers) && deletedLineNumbers.includes(lineNumber)) {
      style.backgroundColor = commitDiffConstants.COMMIT_CHANGE_TYPE_COLOR_STRINGS.REMOVED;
    }

    return { style };
  };

  if (isLoading === true) {
    return (
      <LoadingDialog size={"sm"} message={"Loading Data"} />
    );
  }

  if (unpackingDiff === true) {
    return (
      <LoadingDialog size={"sm"} message={"Calculating Diff"} />
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
        {visibleCodeOption === VISIBLE_CODE_OPTIONS.ORIGINAL ? originalCode : changedCode}
      </SyntaxHighlighter>
    </div>
  );
}

StandaloneDiffFieldBase.propTypes = {
  originalCode: PropTypes.string,
  changedCode: PropTypes.string,
  isLoading: PropTypes.bool,
  language: PropTypes.string,
  visibleCodeOption: PropTypes.string,
};

StandaloneDiffFieldBase.defaultProps = {
  language: "javascript",
  visibleCodeOption: "changed",
};

export default StandaloneDiffFieldBase;