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
import ScriptLanguageSelectInput
  from "components/common/list_of_values_input/inventory/scripts/ScriptLanguageSelectInput";
import ScriptValueInput from "components/inventory/scripts/details/ScriptValueInput";

function ScriptsEditorPanel({ scriptModel, setScriptModel, scriptModelId, scriptRoleDefinitions, handleClose }) {
  const { getAccessRoleData } = useContext(AuthContext);
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
  }, [scriptModelId]);

  const initializeData = async () => {
    setIsLoading(true);
    await loadRoles();
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
    if (canDelete && !scriptModel.isNew()) {
      return (<DeleteModelButtonWithConfirmation dataObject={scriptModel} />);
    }
  };

  if (scriptModel == null) {
    return null;
  }

  return (
    <VanityEditorPanelContainer
      model={scriptModel}
      setModel={setScriptModel}
      isLoading={isLoading}
      handleClose={handleClose}
      extraButtons={getDeleteButton()}
    >
      <Row>
        <Col md={6}>
          <TextInputBase disabled={!scriptModel?.isNew()} setDataObject={setScriptModel} dataObject={scriptModel} fieldName={"name"}/>
        </Col>
        <Col md={6}>
          <ScriptLanguageSelectInput setDataObject={setScriptModel} dataObject={scriptModel} />
        </Col>
        <Col md={8}>
          <ScriptValueInput
            disabled={canEdit !== true}
            setModel={setScriptModel}
            model={scriptModel}
          />
        </Col>
        <Col md={8} className={"my-2"}>
          <RoleAccessInput disabled={canEdit !== true} dataObject={scriptModel} setDataObject={setScriptModel} fieldName={"roles"} />
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

ScriptsEditorPanel.propTypes = {
  scriptModel: PropTypes.object,
  handleClose: PropTypes.func,
  scriptModelId: PropTypes.string,
  scriptRoleDefinitions: PropTypes.object,
  setScriptModel: PropTypes.func
};

export default ScriptsEditorPanel;


