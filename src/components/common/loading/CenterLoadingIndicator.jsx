import React from "react";
import PropTypes from "prop-types";
import LoadingIcon from "components/common/icons/LoadingIcon";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { hasStringValue } from "components/common/helpers/string-helpers";

function CenterLoadingIndicator(
  {
    customMessage,
    type,
  }) {
  const getLoadingMessage = () => {
    if (hasStringValue(customMessage) === true) {
      return customMessage;
    }

    return `Loading ${type}`;
  };

  return (
    <CenteredContentWrapper>
      <LoadingIcon className={"mr-2"}/>{getLoadingMessage()}
    </CenteredContentWrapper>
  );
}

CenterLoadingIndicator.propTypes = {
  customMessage: PropTypes.string,
  type: PropTypes.string,
};

CenterLoadingIndicator.defaultProps = {
  type: "Data",
};

export default CenterLoadingIndicator;