import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import FieldContainer from "components/common/fields/FieldContainer";
import StandaloneDiffFieldBase from "components/common/fields/file/diff/StandaloneDiffFieldBase";

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
        <StandaloneDiffFieldBase
          visibleCodeOption={visibleCodeOption}
          language={language}
          isLoading={isLoading}
          originalCode={originalCode}
          changedCode={changedCode}
        />
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