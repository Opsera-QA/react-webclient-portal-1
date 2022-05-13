import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import FieldContainer from "components/common/fields/FieldContainer";
import StandaloneSourceDeltaDiffFieldBase from "components/common/fields/file/diff/delta/StandaloneSourceDeltaDiffFieldBase";
import StandaloneDestinationDeltaDiffFieldBase
  from "components/common/fields/file/diff/delta/StandaloneDestinationDeltaDiffFieldBase";
import { commitDiffConstants } from "components/common/fields/file/diff/commitDiff.constants";

function StandaloneDeltaDiffField(
  {
    isLoading,
    maximumHeight,
    minimumHeight,
    delta,
    titleText,
    titleIcon,
    className,
    loadDataFunction,
    language,
    visibleCodeOption,
    sourceCode,
    destinationCode,
  }) {
  const getDiffField = () => {
    if (visibleCodeOption === commitDiffConstants.VISIBLE_BRANCH_CODE_OPTIONS.SOURCE) {
      return (
        <StandaloneSourceDeltaDiffFieldBase
          isLoading={isLoading}
          titleText={titleText}
          titleIcon={titleIcon}
          sourceCode={sourceCode}
          delta={delta}
          language={language}
          className={"m-0"}
        />
      );
    }

    return (
      <StandaloneDestinationDeltaDiffFieldBase
        isLoading={isLoading}
        titleText={titleText}
        titleIcon={titleIcon}
        delta={delta}
        destinationCode={destinationCode}
        language={language}
        className={"m-0"}
      />
    );
  };

  return (
    <FieldContainer className={className}>
      <InfoContainer
        titleIcon={titleIcon}
        minimumHeight={minimumHeight}
        maximumHeight={maximumHeight}
        titleText={titleText}
        isLoading={isLoading}
        loadDataFunction={loadDataFunction}
        backgroundColor={"rgb(43, 43, 43)"}
      >
        {getDiffField()}
      </InfoContainer>
    </FieldContainer>
  );
}

StandaloneDeltaDiffField.propTypes = {
  delta: PropTypes.object,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  maximumHeight: PropTypes.string,
  minimumHeight: PropTypes.string,
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  loadDataFunction: PropTypes.func,
  language: PropTypes.string,
  visibleCodeOption: PropTypes.string,
  sourceCode: PropTypes.string,
  destinationCode: PropTypes.string,
};

StandaloneDeltaDiffField.defaultProps = {
  language: "javascript",
  visibleCodeOption: "changed",
};

export default StandaloneDeltaDiffField;