import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";
import DeleteModelButtonWithConfirmation from "components/common/buttons/delete/DeleteModelButtonWithConfirmationModal";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import ScriptLanguageSelectInput
  from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";
import CodeInput from "components/common/inputs/code/CodeInput";
import ScriptValueInput from "components/inventory/scripts/details/ScriptValueInput";

function ScriptsEditorPanel({ scriptModel, scriptRoleDefinitions, handleClose }) {
  const { getAccessRoleData, isSassUser } = useContext(AuthContext);
  const [scriptData, setScriptData] = useState(undefined);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (scriptModel == null) {
      setScriptData(undefined);
    }

    if (scriptModel && Object.keys(scriptModel).length !== 0) {
      initializeData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [scriptModel && scriptModel.getData("_id")]);

  const initializeData = async () => {
    setIsLoading(true);
    await loadRoles();
    setScriptData({...scriptModel});
    setIsLoading(false);
  };

  const loadRoles = async () => {
    const userRoleAccess = await getAccessRoleData();
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      const deleteAllowed = workflowAuthorizedActions.isActionAllowed(userRoleAccess, "delete_script", scriptModel.getData("owner"), scriptModel.getData("roles"), scriptRoleDefinitions);
      setCanDelete(deleteAllowed);
      const editAllowed = workflowAuthorizedActions.isActionAllowed(userRoleAccess, "update_script", scriptModel.getData("owner"), scriptModel.getData("roles"), scriptRoleDefinitions);
      setCanEdit(editAllowed);
    }
  };

  const getDeleteButton = () => {
    if (canDelete && !scriptData.isNew()) {
      return (<DeleteModelButtonWithConfirmation dataObject={scriptData} />);
    }
  };

  const getFields = () => {
    if (isSassUser() === true) {
      return (
        <Row>
          <Col md={6}>
            <TextInputBase disabled={!scriptData?.isNew()} setDataObject={setScriptData} dataObject={scriptData} fieldName={"name"}/>
          </Col>
          <Col md={6}>
            <ScriptLanguageSelectInput setDataObject={setScriptData} dataObject={scriptData} />
          </Col>
          <Col md={8}>
            <TextAreaInput disabled={canEdit !== true} setDataObject={setScriptData} dataObject={scriptData} fieldName={"value"}/>
          </Col>
        </Row>
      );
    }

    return (
      <Row>
        <Col md={12} lg={scriptData?.isNew() ? 4 : 5}>
          <TextInputBase disabled={!scriptData?.isNew()} setDataObject={setScriptData} dataObject={scriptData} fieldName={"name"}/>
          <ScriptLanguageSelectInput setDataObject={setScriptData} dataObject={scriptData} />
        </Col>
        <Col md={12} lg={scriptData?.isNew() ? 8 : 7} className={"my-2"}>
          <RoleAccessInput disabled={canEdit !== true} dataObject={scriptData} setDataObject={setScriptData} fieldName={"roles"} />
        </Col>
        <Col md={12}>
          <ScriptValueInput
            disabled={canEdit !== true}
            setModel={setScriptData}
            model={scriptData}
          />
        </Col>
      </Row>
    );
  };

  if (scriptData == null) {
    return null;
  }

  return (
    <VanityEditorPanelContainer
      model={scriptData}
      setModel={setScriptData}
      isLoading={isLoading}
      handleClose={handleClose}
      extraButtons={getDeleteButton()}
    >
      {getFields()}
    </VanityEditorPanelContainer>
  );
}

ScriptsEditorPanel.propTypes = {
  scriptModel: PropTypes.object,
  handleClose: PropTypes.func,
  scriptRoleDefinitions: PropTypes.object
};

export default ScriptsEditorPanel;


