import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DeleteModelButtonWithConfirmation from "components/common/buttons/delete/DeleteModelButtonWithConfirmationModal";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import ParameterValueTextInput from "components/inventory/parameters/details/ParameterValueTextInput";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";

function ParametersEditorPanel({ parameterModel, setParameterModel, parameterModelId, parameterRoleDefinitions, handleClose }) {
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

    if (parameterModel && Object.keys(parameterModel).length !== 0) {
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
  }, [parameterModelId]);

  const initializeData = async () => {
    setIsLoading(true);
    await loadRoles();
    setIsLoading(false);
  };

  const loadRoles = async () => {
    const userRoleAccess = await getAccessRoleData();
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      const deleteAllowed = workflowAuthorizedActions.isActionAllowed(userRoleAccess, "delete_parameter", parameterModel.getData("owner"), parameterModel.getData("roles"), parameterRoleDefinitions);
      setCanDelete(deleteAllowed);
      const editAllowed = workflowAuthorizedActions.isActionAllowed(userRoleAccess, "update_parameter", parameterModel.getData("owner"), parameterModel.getData("roles"), parameterRoleDefinitions);
      setCanEdit(editAllowed);
    }
  };

  const getDeleteButton = () => {
    if (canDelete && !parameterModel.isNew()) {
      return (<DeleteModelButtonWithConfirmation dataObject={parameterModel} />);
    }
  };

  if (parameterModel == null) {
    return null;
  }

  return (
    <VanityEditorPanelContainer
      model={parameterModel}
      setModel={setParameterModel}
      isLoading={isLoading}
      handleClose={handleClose}
      extraButtons={getDeleteButton()}
    >
      <Row>
        <Col md={12} lg={parameterModel?.isNew() ? 4 : 5}>
          <TextInputBase disabled={!parameterModel?.isNew()} setDataObject={setParameterModel} dataObject={parameterModel} fieldName={"name"}/>
          <ParameterValueTextInput disabled={canEdit !== true} setDataObject={setParameterModel} dataObject={parameterModel} fieldName={"value"}/>
          <BooleanToggleInput setDataObject={setParameterModel} dataObject={parameterModel} fieldName={"vaultEnabled"} disabled={!parameterModel?.isNew()}/>
        </Col>
        <Col md={12} lg={parameterModel?.isNew() ? 8 : 7} className={"my-2"}>
          <RoleAccessInput disabled={canEdit !== true} dataObject={parameterModel} setDataObject={setParameterModel} fieldName={"roles"} />
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

ParametersEditorPanel.propTypes = {
  parameterModel: PropTypes.object,
  setParameterModel: PropTypes.func,
  parameterModelId: PropTypes.string,
  handleClose: PropTypes.func,
  parameterRoleDefinitions: PropTypes.object
};

export default ParametersEditorPanel;


