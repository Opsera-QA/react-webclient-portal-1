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
import DataValidatorInput from "components/common/inputs/object/data_validator/DataValidatorInput";

export default function ParametersEditorPanel(
  {
    parameterModel,
    setParameterModel,
    handleClose,
  }) {

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
        <Col xs={12} sm={6}>
          <TextInputBase
            disabled={!parameterModel?.isNew()}
            setDataObject={setParameterModel}
            dataObject={parameterModel}
            fieldName={"name"}
          />
        </Col>
        <Col xs={12} sm={6}>
          <ParameterVaultEnabledToggle
            fieldName={"vaultEnabled"}
            setModel={setParameterModel}
            model={parameterModel}
            disabled={!parameterModel?.isNew()}
          />
        </Col>
        <Col md={12}>
          {getValueInput()}
        </Col>
        <Col md={12}>
          <RoleAccessInput
            disabled={parameterModel.isNew() === false && parameterModel?.canEditAccessRoles() !== true}
            model={parameterModel}
            setModel={setParameterModel}
          />
        </Col>
        <Col md={12}>
          <DataValidatorInput
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

