import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import LoadingDialog from "../../../status_notifications/loading";
import SaveButtonContainer from "../../../buttons/saving/containers/SaveButtonContainer";
import StrictSaveButton from "../../../buttons/saving/StrictSaveButton";
import {Row} from "react-bootstrap";
import TestToolConnectionButton from "../../../buttons/connection/TestToolConnectionButton";
import RequiredFieldsMessage from "../../../form_fields/RequiredFieldsMessage";

function ToolConfigurationEditorPanelContainer({children, isLoading, persistRecord, recordDto, toolConnectionCheckName, toolData}) {
  const getToolConnectionCheckButton = () => {
    if (toolConnectionCheckName != null && toolData != null) {
     return (
       <Row>
         <div className="ml-auto mr-3">
           <TestToolConnectionButton recordData={toolData} toolName={toolConnectionCheckName} disable={recordDto.isNew() || recordDto.isChanged()}/>
         </div>
       </Row>
     )
    }
  };

  if (isLoading || recordDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Form className="scroll-y full-height">
      <div>
        {getToolConnectionCheckButton()}
        <div>{children}</div>
        <div className="mr-2">
          <SaveButtonContainer>
            <StrictSaveButton updateRecord={persistRecord} recordDto={recordDto} />
          </SaveButtonContainer>
        </div>
        <RequiredFieldsMessage />
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
}

export default ToolConfigurationEditorPanelContainer;