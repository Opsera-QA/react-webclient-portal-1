
import React from "react";
import PropTypes from "prop-types";
import ArgoGroupKindInputBase from "components/common/list_of_values_input/tools/argo_cd/group_kind/ArgoGroupKindInputBase";

// TODO: if this doesn't change the base input, we should just be using the base input
function ArgoGroupKindInput({ dataObject, setDataObject, disabled, fieldName}) {
  return (
    <ArgoGroupKindInputBase
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={false}
      disabled={disabled}
    />
  );
}

ArgoGroupKindInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ArgoGroupKindInput;