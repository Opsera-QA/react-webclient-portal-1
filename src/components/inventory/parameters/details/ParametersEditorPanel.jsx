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
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import VisibleVaultTextInput from "components/common/inputs/text/VisibleVaultTextInput";

function ParametersEditorPanel({ parameterModel, handleClose }) {
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

  // TODO: Add RBAC check
  const getDeleteButton = () => {
    if (!parameterData.isNew()) {
      return (<DeleteButtonWithConfirmation deleteRecord={() => parameterData.deleteModel()} dataObject={parameterData} />);
    }
  };

  if (parameterData == null) {
    return null;
  }

  // TODO: Create new VanityEditorPanel, handle save or update in new save/create buttons
  return (
    <VanityEditorPanelContainer
      model={parameterData}
      setModel={setParameterData}
      isLoading={isLoading}
      handleClose={handleClose}
      extraButtons={getDeleteButton()}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase setDataObject={setParameterData} dataObject={parameterData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <VisibleVaultTextInput setDataObject={setParameterData} dataObject={parameterData} fieldName={"value"}/>
        </Col>
        <Col lg={12}>
          <RoleAccessInput dataObject={parameterData} setDataObject={setParameterData} fieldName={"roles"} />
        </Col>
        <Col lg={6}>
          <BooleanToggleInput setDataObject={setParameterData} dataObject={parameterData} fieldName={"vaultEnabled"} disabled={!parameterData?.isNew()}/>
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

ParametersEditorPanel.propTypes = {
  parameterModel: PropTypes.object,
  handleClose: PropTypes.func,
};

export default ParametersEditorPanel;


