import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import FieldLabelBase from "components/common/fields/FieldLabelBase";

function PipelineSourceRepositorySecretInput({className, fieldName, model, setModel, disabled, visible}) {
  return (
    <TextInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      className={className}
      style={{WebkitTextSecurity: 'disc'}}
      visible={visible}
    />
  );
}

PipelineSourceRepositorySecretInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  visible: PropTypes.bool,
};

PipelineSourceRepositorySecretInput.defaultProps = {
  fieldName: "key",
};

export default PipelineSourceRepositorySecretInput;