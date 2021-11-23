import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

function DetailPanelLoadingDialog({ type }) {
  return (
    <div className="p-5 text-lg-center">
      <span className="m-auto"><FontAwesomeIcon icon={faSpinner} spin className="mr-2"/>Loading {type}</span>
    </div>
  );
}

DetailPanelLoadingDialog.propTypes = {
  type: PropTypes.string
};

DetailPanelLoadingDialog.defaultProps = {
  type: "data",
};

export default DetailPanelLoadingDialog;