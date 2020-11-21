import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "../../status_notifications/loading";
import Form from "react-bootstrap/Form";

function EditorPanelContainer({ children, isLoading, showRequiredFieldsMessage }) {
  const getRequiredFieldsMessage = () => {
    if (showRequiredFieldsMessage) {
      return (
        <div>
          <small className="form-text text-muted text-right mr-2 mt-3"><span className="danger-red">*</span> Required Fields</small>
        </div>
      );
    }
  }

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Form className="scroll-y full-height">
      <div className="p-3">
        <div>{children}</div>
        {getRequiredFieldsMessage()}
      </div>
    </Form>
  );
}


EditorPanelContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  showRequiredFieldsMessage: PropTypes.bool
};

EditorPanelContainer.defaultProps = {
  showRequiredFieldsMessage: true
}

export default EditorPanelContainer;