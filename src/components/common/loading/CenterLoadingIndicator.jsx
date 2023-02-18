import React from "react";
import PropTypes from "prop-types";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import OpseraBirdLoadingImage from "temp-library-components/loader/OpseraBirdLoadingImage";

export default function CenterLoadingIndicator(
  {
    customMessage,
    minHeight,
    type,
  }) {
  const getLoadingMessage = () => {
    if (hasStringValue(customMessage) === true) {
      return customMessage;
    }

    return `Loading ${type}`;
  };

  return (
    <CenteredContentWrapper
      minHeight={minHeight}
    >
      <OpseraBirdLoadingImage />
      <div className={"d-flex"}>
        <div
          className={"my-auto"}
          style={{
            fontSize: "1.15rem",
            letterSpacing: "2px",
          }}
        >
          {getLoadingMessage()}
        </div>
      </div>
    </CenteredContentWrapper>
  );
}

CenterLoadingIndicator.propTypes = {
  customMessage: PropTypes.string,
  type: PropTypes.string,
  minHeight: PropTypes.string,
};

CenterLoadingIndicator.defaultProps = {
  type: "Data",
  minHeight: "200px",
};