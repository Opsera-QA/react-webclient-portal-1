import React from "react";
import PropTypes from "prop-types";
import LoadingIcon from "components/common/icons/LoadingIcon";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { hasStringValue } from "components/common/helpers/string-helpers";

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
      <div
        style={{
          fontSize: "1.25rem",
          letterSpacing: "2px",
        }}
      >
        <LoadingIcon className={"mr-2"}/>{getLoadingMessage()}
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
};