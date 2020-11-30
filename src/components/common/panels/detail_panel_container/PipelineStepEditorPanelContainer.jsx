import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "../../status_notifications/loading";
import Form from "react-bootstrap/Form";

// TODO: After final refactor of pipeline configurations, this component might be irrelevant
function PipelineStepEditorPanelContainer({ children, isLoading, showRequiredFieldsMessage }) {
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
      <div>
        <div>{children}</div>
        {getRequiredFieldsMessage()}
      </div>
    </Form>
  );
}


PipelineStepEditorPanelContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  showRequiredFieldsMessage: PropTypes.bool
};

PipelineStepEditorPanelContainer.defaultProps = {
  showRequiredFieldsMessage: true
}

export default PipelineStepEditorPanelContainer;