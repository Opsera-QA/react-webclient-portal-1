import React from "react";
import PropTypes from "prop-types";
import LoadingIcon from "components/common/icons/LoadingIcon";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";

function CenterLoadingIndicator(
  {
    type,
  }) {
  return (
    <CenteredContentWrapper>
      <LoadingIcon className={"mr-2"}/>Loading {type}
    </CenteredContentWrapper>
  );
}

CenterLoadingIndicator.propTypes = {
  type: PropTypes.string
};

CenterLoadingIndicator.defaultProps = {
  type: "Data",
};

export default CenterLoadingIndicator;