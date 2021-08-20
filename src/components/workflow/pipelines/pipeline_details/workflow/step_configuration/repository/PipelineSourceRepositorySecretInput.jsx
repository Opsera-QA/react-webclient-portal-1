import React from "react";
import PropTypes from "prop-types";
import PasswordInput from "components/common/inputs/text/PasswordInput";

function PipelineSourceRepositorySecretInput({className, fieldName, model, setModel, disabled, visible}) {
  if (visible === false) {
    return null;
  }

  return (
    <div>
      <h6>Settings:</h6>
      <div className="text-muted pl-1 mb-3">
        <b>Content Type:</b> application/json<br/>
        <b>SSL verification:</b> enabled<br/>
        <b>Selected events:</b> <i>just the push event</i><br/>
      </div>
      <PasswordInput
        fieldName={fieldName}
        configurationRequired={true}
        dataObject={model}
        setDataObject={setModel}
        disabled={disabled}
        className={className}
      />
    </div>
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