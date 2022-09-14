import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import JsonInput from "components/common/inputs/object/JsonInput";
import TagManager from "components/common/inputs/tags/TagManager";
import useComponentStateReference from "hooks/useComponentStateReference";
import { taskTemplateActions } from "components/admin/task_templates/taskTemplate.actions";
import TaskTypeSelectInputBase from "components/common/list_of_values_input/tasks/TaskTypeSelectInputBase";
import CodeInputBase from "components/common/inputs/code/CodeInputBase";

export default function TaskTemplateEditorPanel({ templateModel, setTemplateModel, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const { cancelTokenSource } = useComponentStateReference();

  const createTemplate = async () => {
    return await taskTemplateActions.createTemplateV2(
      getAccessToken,
      cancelTokenSource,
      templateModel
    );
  };

  const updateTemplate = async () => {
    return await taskTemplateActions.updateTemplateV2(
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
          />
        </Col>
        <Col lg={6}>
          <TaskTypeSelectInputBase
            fieldName={"type"}
            model={templateModel}
            setModel={setTemplateModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={templateModel}
            setDataObject={setTemplateModel}
          />
        </Col>
        {/*<Col lg={6}>*/}
        {/*  <LdapOrganizationAccountSelectInput*/}
        {/*    fieldName={"account"}*/}
        {/*    model={templateModel}*/}
        {/*    setModel={setTemplateModel}*/}
        {/*  />*/}
        {/*</Col>*/}
        {/*<Col lg={6} className="my-auto">*/}
        {/*  <BooleanToggleInput*/}
        {/*    fieldName={"readOnly"}*/}
        {/*    dataObject={templateModel}*/}
        {/*    setDataObject={setTemplateModel}*/}
        {/*  />*/}
        {/*  <BooleanToggleInput*/}
        {/*    fieldName={"singleUse"}*/}
        {/*    dataObject={templateModel}*/}
        {/*    setDataObject={setTemplateModel}*/}
        {/*  />*/}
        {/*  <BooleanToggleInput*/}
        {/*    fieldName={"publicUse"}*/}
        {/*    dataObject={templateModel}*/}
        {/*    setDataObject={setTemplateModel}*/}
        {/*  />*/}
        {/*</Col>*/}
        <Col lg={6}>
          {/*TODO: Make input that just uses the regular configuration panels and leave json input for "advanced" editing*/}
          <JsonInput
            fieldName={"configuration"}
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

TaskTemplateEditorPanel.propTypes = {
  templateModel: PropTypes.object,
  setTemplateModel: PropTypes.func,
  handleClose: PropTypes.func
};


