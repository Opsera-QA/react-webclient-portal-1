import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import pipelineTemplateActions from "components/admin/pipeline_templates/pipelineTemplate.actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PipelineTypeMultiSelectInput
  from "components/common/list_of_values_input/admin/pipeline_templates/PipelineTypeMultiSelectInput";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import LdapOrganizationAccountSelectInput
  from "components/common/list_of_values_input/admin/accounts/ldap_accounts/LdapOrganizationAccountSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import JsonInput from "components/common/inputs/object/JsonInput";
import TagManager from "components/common/inputs/tags/TagManager";
import useComponentStateReference from "hooks/useComponentStateReference";

function PipelineTemplateEditorPanel({ templateModel, setTemplateModel, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const { cancelTokenSource } = useComponentStateReference();

  const createTemplate = async () => {
    return await pipelineTemplateActions.createTemplateV2(
      getAccessToken,
      cancelTokenSource,
      templateModel
    );
  };

  const updateTemplate = async () => {
    return await pipelineTemplateActions.updateTemplateV2(
      getAccessToken,
      cancelTokenSource,
      templateModel
    );
  };

  if (templateModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      createRecord={createTemplate}
      updateRecord={updateTemplate}
      recordDto={templateModel}
      handleClose={handleClose}
      setRecordDto={setTemplateModel}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase
            fieldName={"name"}
            dataObject={templateModel}
            setDataObject={setTemplateModel}
          />
        </Col>
        <Col lg={6}>
          <ActivityToggleInput
            fieldName={"active"}
            dataObject={templateModel}
            setDataObject={setTemplateModel}
          />
        </Col>
        <Col lg={6}>
          <TextInputBase
            fieldName={"identifier"}
            dataObject={templateModel}
            setDataObject={setTemplateModel}
            // inputHelpOverlay={PipelineTemplateIdentifierHelpOverlay}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={templateModel}
            setDataObject={setTemplateModel}
          />
        </Col>
        <Col lg={6}>
          <PipelineTypeMultiSelectInput
            dataObject={templateModel}
            setDataObject={setTemplateModel}
          />
          <LdapOrganizationAccountSelectInput
            fieldName={"account"}
            model={templateModel}
            setModel={setTemplateModel}
          />
        </Col>
        <Col lg={6} className="my-auto">
          <BooleanToggleInput
            fieldName={"readOnly"}
            dataObject={templateModel}
            setDataObject={setTemplateModel}
          />
          <BooleanToggleInput
            fieldName={"singleUse"}
            dataObject={templateModel}
            setDataObject={setTemplateModel}
          />
          <BooleanToggleInput
            fieldName={"publicUse"}
            dataObject={templateModel}
            setDataObject={setTemplateModel}
          />
        </Col>
        <Col lg={6}>
          <JsonInput
            fieldName={"plan"}
            model={templateModel}
            setModel={setTemplateModel}
          />
        </Col>
        <Col lg={6}>
          <TagManager
            type={"template"}
            dataObject={templateModel}
            setDataObject={setTemplateModel}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
    );
}

PipelineTemplateEditorPanel.propTypes = {
  templateModel: PropTypes.object,
  setTemplateModel: PropTypes.func,
  handleClose: PropTypes.func
};

export default PipelineTemplateEditorPanel;


