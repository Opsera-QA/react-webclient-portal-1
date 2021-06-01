import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import TestToolConnectionButton from "components/common/buttons/connection/TestToolConnectionButton";
import LoadingDialog from "components/common/status_notifications/loading";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import StrictSaveButton from "components/common/buttons/saving/StrictSaveButton";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";

function ToolConfigurationEditorPanelContainer({children, isLoading, persistRecord, recordDto, toolConnectionCheckName, toolData}) {
  const getToolConnectionCheckButton = () => {
    if (toolConnectionCheckName != null && toolData != null) {
     return (
        <TestToolConnectionButton toolDataDto={toolData} toolName={toolConnectionCheckName} disable={recordDto.isNew() || recordDto.isChanged()}/>
     );
    }
  };

  if (isLoading || recordDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Form className="scroll-y full-height">
      <div>
        <div className="d-flex justify-content-between">
          <div className="text-muted pt-1 pb-3">Enter tool specific configuration information below.  These settings will be used for pipelines.</div>
          <div>{getToolConnectionCheckButton()}</div>
        </div>
        <div>{children}</div>
        <div className="mr-3">
          <SaveButtonContainer>
            <StrictSaveButton updateRecord={persistRecord} recordDto={recordDto} />
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
  toolData: PropTypes.object
};

ToolConfigurationEditorPanelContainer.defaultProps = {
  showRequiredFieldsMessage: true
};

export default ToolConfigurationEditorPanelContainer;