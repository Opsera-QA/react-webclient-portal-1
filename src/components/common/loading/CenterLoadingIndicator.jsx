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
          fontSize: "1.15rem",
          letterSpacing: "2px",
        }}
        className={"d-flex"}
      >
        <LoadingIcon className={"mr-3 mt-auto"}/>
        <div className={"my-auto"}>
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
  minHeight: "250px",
};