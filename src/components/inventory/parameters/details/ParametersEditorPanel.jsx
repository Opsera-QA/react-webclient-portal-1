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
import DeleteButtonWithConfirmation from "components/common/buttons/delete/DeleteButtonWithConfirmationModal";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";

function ParametersEditorPanel({ parameterModel, loadData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [parameterData, setParameterData] = useState(undefined);
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
  }, [JSON.stringify(parameterModel)]);

  const initializeData = async () => {
    setIsLoading(true);
    setParameterData(parameterModel);
    setIsLoading(false);
  };

  const createParameter = async () => {
    return await parametersActions.createParameterV2(getAccessToken, cancelTokenSource, parameterData);
  };

  const updateParameter = async () => {
    const response =  await parametersActions.updateParameterV2(getAccessToken, cancelTokenSource, parameterData);
    await loadData();
    return response;
  };

  const deleteParameter = async () => {
    const response =  await parametersActions.deleteParameterV2(getAccessToken, cancelTokenSource, parameterData);
    await loadData();
    return response;
  };

  // TODO: Add RBAC check
  const getDeleteButton = () => {
    if (!parameterData.isNew()) {
      return (<DeleteButtonWithConfirmation deleteRecord={deleteParameter} dataObject={parameterData} />);
    }
  };

  if (parameterData == null) {
    return null;
  }

  return (
    <EditorPanelContainer
      recordDto={parameterData}
      createRecord={createParameter}
      updateRecord={updateParameter}
      setRecordDto={setParameterData}
      isLoading={isLoading}
      handleClose={handleClose}
      extraButtons={getDeleteButton()}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase setDataObject={setParameterData} dataObject={parameterData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextInputBase setDataObject={setParameterData} dataObject={parameterData} fieldName={"value"}/>
        </Col>
        <Col lg={12}>
          <RoleAccessInput dataObject={parameterData} setDataObject={setParameterData} fieldName={"roles"} />
        </Col>
        <Col lg={6}>
          <BooleanToggleInput setDataObject={setParameterData} dataObject={parameterData} fieldName={"vaultEnabled"} disabled={!parameterData?.isNew()}/>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

ParametersEditorPanel.propTypes = {
  parameterModel: PropTypes.object,
  handleClose: PropTypes.func,
  loadData: PropTypes.func
};

export default ParametersEditorPanel;


