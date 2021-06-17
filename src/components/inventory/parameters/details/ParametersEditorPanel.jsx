import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";
import parametersActions from "components/inventory/parameters/parameters-actions";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DeleteModelButtonWithConfirmation from "components/common/buttons/delete/DeleteModelButtonWithConfirmationModal";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import ParameterValueTextInput from "components/inventory/parameters/details/ParameterValueTextInput";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";

function ParametersEditorPanel({ parameterModel, parameterRoleDefinitions, handleClose }) {
  const { getAccessRoleData } = useContext(AuthContext);
  const [parameterData, setParameterData] = useState(undefined);
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

    if (parameterModel == null) {
      setParameterData(undefined);
    }

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
  }, [parameterModel && parameterModel.getData("_id")]);

  const initializeData = async () => {
    setIsLoading(true);
    await loadRoles();
    setParameterData({...parameterModel});
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
    if (canDelete && !parameterData.isNew()) {
      return (<DeleteModelButtonWithConfirmation dataObject={parameterData} />);
    }
  };

  if (parameterData == null) {
    return null;
  }

  return (
    <VanityEditorPanelContainer
      model={parameterData}
      setModel={setParameterData}
      isLoading={isLoading}
      handleClose={handleClose}
      extraButtons={getDeleteButton()}
    >
      <Row>
        <Col md={12} lg={parameterData?.isNew() ? 4 : 5}>
          <TextInputBase disabled={!parameterData?.isNew()} setDataObject={setParameterData} dataObject={parameterData} fieldName={"name"}/>
          <ParameterValueTextInput disabled={canEdit !== true} setDataObject={setParameterData} dataObject={parameterData} fieldName={"value"}/>
          <BooleanToggleInput setDataObject={setParameterData} dataObject={parameterData} fieldName={"vaultEnabled"} disabled={!parameterData?.isNew()}/>
        </Col>
        <Col md={12} lg={parameterData?.isNew() ? 8 : 7} className={"my-2"}>
          <RoleAccessInput disabled={canEdit !== true} dataObject={parameterData} setDataObject={setParameterData} fieldName={"roles"} />
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

ParametersEditorPanel.propTypes = {
  parameterModel: PropTypes.object,
  handleClose: PropTypes.func,
  parameterRoleDefinitions: PropTypes.object
};

export default ParametersEditorPanel;


