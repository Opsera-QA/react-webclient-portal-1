import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import ParameterVaultEnabledToggle from "components/inventory/parameters/details/ParameterVaultEnabledToggle";
import TogglePasswordTextAreaInput from "components/common/inputs/textarea/password/TogglePasswordTextAreaInput";
import ParameterValueTextAreaInput from "components/inventory/parameters/details/ParameterValueTextAreaInput";

export default function ParametersEditorPanel({ parameterModel, setParameterModel, handleClose }) {
  const getValueInput = () => {
    if (parameterModel?.getData("vaultEnabled") === true && parameterModel?.isNew() !== true) {
      return (
        <ParameterValueTextAreaInput
          disabled={parameterModel?.isNew() === false && parameterModel?.canUpdate() !== true}
          setModel={setParameterModel}
          model={parameterModel}
          fieldName={"value"}
        />
      );
    }

    return (
      <TogglePasswordTextAreaInput
        model={parameterModel}
        setModel={setParameterModel}
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
      className={"mx-2 mb-2"}
    >
      <Row>
        <Col md={12} lg={parameterModel?.isNew() ? 4 : 5}>
          <TextInputBase
            disabled={!parameterModel?.isNew()}
            setDataObject={setParameterModel}
            dataObject={parameterModel}
            fieldName={"name"}
          />
          <ParameterVaultEnabledToggle
            fieldName={"vaultEnabled"}
            setModel={setParameterModel}
            model={parameterModel}
            disabled={!parameterModel?.isNew()}
          />
          {getValueInput()}
        </Col>
        <Col md={12} lg={parameterModel?.isNew() ? 8 : 7} className={"my-2"}>
          <RoleAccessInput
            disabled={parameterModel.isNew() === false && parameterModel?.canEditAccessRoles() !== true}
            model={parameterModel}
            setModel={setParameterModel}
          />
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

ParametersEditorPanel.propTypes = {
  parameterModel: PropTypes.object,
  setParameterModel: PropTypes.func,
  handleClose: PropTypes.func,
};

