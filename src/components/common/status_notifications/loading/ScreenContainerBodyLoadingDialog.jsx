import React from "react";
import PropTypes from "prop-types";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

export default function ScreenContainerBodyLoadingDialog({ message }) {
  return (
    <CenterLoadingIndicator
      minHeight={"calc(100vh - 255px)"}
      customMessage={message}
    />
  );
}

ScreenContainerBodyLoadingDialog.propTypes = {
  message: PropTypes.string,
};

ScreenContainerBodyLoadingDialog.defaultProps = {
  message: "Loading Data",
};
