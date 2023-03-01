import React from "react";
import PropTypes from "prop-types";
import ArgoProjectSelectInput
  from "components/common/list_of_values_input/tools/argo_cd/projects/ArgoProjectSelectInput";

function ArgoRepositoriesArgoProjectSelectInput(
  {
    argoToolId,
    visible,
    fieldName,
    model,
    setModel,
    disabled,
    className,
  }) {
  const setDataFunction = (fieldName, value) => {
    const newModel = model;
    newModel.setData("project", value?.name);
    setModel({ ...newModel });
  };

  if (visible === false) {
    return null;
  }

  return (
    <ArgoProjectSelectInput
      className={className}
      argoToolId={argoToolId}
      model={model}
      setModel={setModel}
      disabled={disabled}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      visible={visible}
    />
  );
}

ArgoRepositoriesArgoProjectSelectInput.propTypes = {
  argoToolId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

export default ArgoRepositoriesArgoProjectSelectInput;
