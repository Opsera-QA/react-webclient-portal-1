import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "../../status_notifications/loading";
import Form from "react-bootstrap/Form";

function DetailPanelContainer({ children, isLoading, showRequiredFieldsMessage }) {

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Form className="scroll-y full-height">
      <div className="p-3">
        <div>{children}</div>
        {showRequiredFieldsMessage && <div><small className="form-text text-muted text-right mr-2 mt-3"><span className="danger-red">*</span> Required Fields</small></div>}
      </div>
    </Form>
  );
}


DetailPanelContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  showRequiredFieldsMessage: PropTypes.bool
};

DetailPanelContainer.defaultProps = {
  showRequiredFieldsMessage: true
}

export default DetailPanelContainer;