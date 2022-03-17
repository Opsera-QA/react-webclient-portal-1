import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import TestToolConnectionButton from "components/common/buttons/connection/tool/TestToolConnectionButton";
import LoadingDialog from "components/common/status_notifications/loading";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import StrictSaveButton from "components/common/buttons/saving/StrictSaveButton";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";

function ToolConfigurationEditorPanelContainer(
  {
    children,
    isLoading,
    persistRecord,
    model,
    setModel,
    toolConnectionCheckName,
    toolData,
    leftSideButtons,
  }) {
  const getToolConnectionCheckButton = () => {
    if (toolConnectionCheckName != null && toolData != null) {
     return (
        <TestToolConnectionButton
          toolModel={toolData}
          toolName={toolConnectionCheckName}
          disabled={model?.checkCurrentValidity() !== true || model?.isChanged()}
        />
     );
    }
  };

  if (isLoading || model == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Form className="scroll-y hide-x-overflow full-height">
      <div>
        <div className="d-flex justify-content-between">
          <div className="text-muted pt-1 pb-3">Enter tool specific configuration information below.  These settings will be used for pipelines.</div>
          <div>{getToolConnectionCheckButton()}</div>
        </div>
        <div>{children}</div>
        <div>
          <SaveButtonContainer extraButtons={leftSideButtons}>
            <StrictSaveButton updateRecord={persistRecord} recordDto={model} setModel={setModel} />
          </SaveButtonContainer>
          <RequiredFieldsMessage />
        </div>
      </div>
    </Form>
  );
}


ToolConfigurationEditorPanelContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  persistRecord: PropTypes.func,
  recordDto: PropTypes.object,
  toolConnectionCheckName: PropTypes.string,
  toolData: PropTypes.object,
  model: PropTypes.object,
  setModel: PropTypes.func,
  leftSideButtons: PropTypes.any,
};

ToolConfigurationEditorPanelContainer.defaultProps = {
  showRequiredFieldsMessage: true
};

export default ToolConfigurationEditorPanelContainer;