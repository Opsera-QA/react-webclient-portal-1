import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DeleteModelButtonWithConfirmation from "components/common/buttons/delete/DeleteModelButtonWithConfirmationModal";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import ParameterValueTextInput from "components/inventory/parameters/details/ParameterValueTextInput";
import TogglePasswordTextInput from "components/common/inputs/text/TogglePasswordTextInput";

function ParametersEditorPanel({ parameterModel, setParameterModel, parameterModelId, handleClose }) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [parameterModelId]);

  const getValueInput = () => {
    if (parameterModel?.getData("vaultEnabled") === true) {

      if (parameterModel?.isNew()) {
        return (
          <TogglePasswordTextInput
            model={parameterModel}
            setModel={setParameterModel}
            fieldName={"value"}
          />
        );
      }

      return (
        <ParameterValueTextInput
          disabled={parameterModel?.isNew() === false && parameterModel?.canUpdate() !== true}
          setDataObject={setParameterModel}
          dataObject={parameterModel}
          fieldName={"value"}
          parameterId={parameterModel?.getData("_id")}
        />
      );
    }

    return (
      <TextInputBase
        dataObject={parameterModel}
        setDataObject={setParameterModel}
        fieldName={"value"}
        disabled={parameterModel?.isNew() === false && parameterModel?.canUpdate() !== true}
      />
    );
  };

  if (parameterModel == null) {
    return null;
  }

  return (
    <VanityEditorPanelContainer
      model={parameterModel}
      setModel={setParameterModel}
      handleClose={handleClose}
    >
      <Row>
        <Col md={12} lg={parameterModel?.isNew() ? 4 : 5}>
          <TextInputBase disabled={!parameterModel?.isNew()} setDataObject={setParameterModel} dataObject={parameterModel} fieldName={"name"}/>
          <BooleanToggleInput setDataObject={setParameterModel} dataObject={parameterModel} fieldName={"vaultEnabled"} disabled={!parameterModel?.isNew()}/>
          {getValueInput()}
        </Col>
        <Col md={12} lg={parameterModel?.isNew() ? 8 : 7} className={"my-2"}>
          <RoleAccessInput disabled={parameterModel?.canEditAccessRoles() !== true} dataObject={parameterModel} setDataObject={setParameterModel} fieldName={"roles"} />
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
};

export default ParametersEditorPanel;


