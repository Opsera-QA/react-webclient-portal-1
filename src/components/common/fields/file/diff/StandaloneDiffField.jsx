import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { diffHelper } from "utils/diff.helper";
import InfoContainer from "components/common/containers/InfoContainer";
import { hasStringValue } from "components/common/helpers/string-helpers";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import SyntaxHighlighter from 'react-syntax-highlighter';
import styling from "react-syntax-highlighter/dist/cjs/styles/hljs/darcula";
import FieldContainer from "components/common/fields/FieldContainer";

export const VISIBLE_CODE_OPTIONS = {
  ORIGINAL: "original",
  CHANGED: "changed",
};

function StandaloneDiffField(
  {
    isLoading,
    maximumHeight,
    minimumHeight,
    originalCode,
    changedCode,
    titleText,
    titleIcon,
    className,
    loadDataFunction,
    language,
    visibleCodeOption,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [unpackingDiff, setUnpackingDiff] = useState(true);
  const separatedDiffLineNumbers = useRef(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    separatedDiffLineNumbers.current = undefined;
    isMounted.current = true;

    if (hasStringValue(originalCode) === true && hasStringValue(changedCode) === true) {
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
      separatedDiffLineNumbers.current = diffHelper.getSeparatedDiffLineNumbers(originalCode, changedCode);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setUnpackingDiff(false);
      }
    }
  };

  const getLineNumberStyling = (lineNumber) => {
    const style = { display: "block" };
    const diffObject = visibleCodeOption === VISIBLE_CODE_OPTIONS.ORIGINAL ? separatedDiffLineNumbers?.current?.firstString : separatedDiffLineNumbers?.current?.secondString;
    const insertedLineNumbers = diffObject?.insertedLineNumbers;
    const deletedLineNumbers = diffObject?.deletedLineNumbers;

    if (Array.isArray(insertedLineNumbers) && insertedLineNumbers.includes(lineNumber)) {
      style.backgroundColor = "rgba(51,255,51,0.1)";
    } else if (Array.isArray(deletedLineNumbers) && deletedLineNumbers.includes(lineNumber)) {
      style.backgroundColor = "rgba(255,51,51,0.2)";
    }

    return { style };
  };

  const getBody = () => {
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
      <SyntaxHighlighter
        style={styling}
        lineProps={(lineNumber) => getLineNumberStyling(lineNumber)}
        language={language}
        wrapLines={true}
        wrapLongLines={true}
        showLineNumbers={true}
      >
        {visibleCodeOption === VISIBLE_CODE_OPTIONS.ORIGINAL ? originalCode : changedCode}
      </SyntaxHighlighter>
    );
  };

  return (
    <FieldContainer className={className}>
      <InfoContainer
        titleIcon={titleIcon}
        minimumHeight={minimumHeight}
        maximumHeight={maximumHeight}
        titleText={titleText}
        isLoading={unpackingDiff || isLoading}
        loadDataFunction={loadDataFunction}
        backgroundColor={"rgb(43, 43, 43)"}
      >
        {getBody()}
      </InfoContainer>
    </FieldContainer>
  );
}

StandaloneDiffField.propTypes = {
  originalCode: PropTypes.string,
  changedCode: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  maximumHeight: PropTypes.string,
  minimumHeight: PropTypes.string,
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  loadDataFunction: PropTypes.func,
  language: PropTypes.string,
  visibleCodeOption: PropTypes.string,
};

StandaloneDiffField.defaultProps = {
  language: "javascript",
  visibleCodeOption: "changed",
};

export default StandaloneDiffField;