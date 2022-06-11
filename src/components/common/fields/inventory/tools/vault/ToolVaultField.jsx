import React from "react";
import PropTypes from "prop-types";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function ToolVaultField({ model, fieldName }) {
  if (model?.getData(fieldName) === "") {
    return (
      <StandaloneTextFieldBase
        label={model?.getLabel(fieldName)}
        text={"Opsera Default Hashicorp Vault"}
      />
    );
  }

  return (
    <ToolNameField
      model={model}
      fieldName={fieldName}
    />
  );
}

ToolVaultField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
};

ToolVaultField.defaultProps = {
  fieldName: "vault",
};

export default ToolVaultField;