import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";

function DetailPanelContainer({ children, isLoading, showRequiredFieldsMessage }) {

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className="scroll-y full-height">
      <div className="mt-3">
        <div>{children}</div>
        {showRequiredFieldsMessage && <div><small className="form-text text-muted text-right mr-2 mt-3"><span className="danger-red">*</span> Required Fields</small></div>}
      </div>
    </div>
  );
}


DetailPanelContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  showRequiredFieldsMessage: PropTypes.bool
};

export default DetailPanelContainer;