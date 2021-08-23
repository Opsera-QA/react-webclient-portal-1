import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "../../status_notifications/loading";
import Form from "react-bootstrap/Form";
import PipelineStepConfigurationButtonContainer
  from "../../buttons/saving/containers/PipelineStepConfigurationButtonContainer";

// TODO: After final refactor of pipeline configurations, this component might be irrelevant
function PipelineStepEditorPanelContainer({ children, isLoading, showRequiredFieldsMessage, persistRecord, recordDto, handleClose, isStrict, disableSaveButton }) {
  const getRequiredFieldsMessage = () => {
    if (showRequiredFieldsMessage !== "false") {
      return (
        <div>
          <small className="form-text text-muted text-right mr-2 mt-3"><span className="danger-red">*</span> Required Fields</small>
        </div>
      );
    }
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Form className="scroll-y full-height">
      <div>
        <div>{children}</div>
        <PipelineStepConfigurationButtonContainer
          persistRecord={persistRecord}
          recordDto={recordDto}
          handleClose={handleClose}
          isStrict={isStrict}
          disableSaveButton={disableSaveButton}
        />
        {getRequiredFieldsMessage()}
      </div>
    </Form>
  );
}


PipelineStepEditorPanelContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  showRequiredFieldsMessage: PropTypes.bool,
  persistRecord: PropTypes.func,
  recordDto: PropTypes.object,
  handleClose: PropTypes.func,
  isStrict: PropTypes.bool,
  disableSaveButton: PropTypes.bool,
};

export default PipelineStepEditorPanelContainer;