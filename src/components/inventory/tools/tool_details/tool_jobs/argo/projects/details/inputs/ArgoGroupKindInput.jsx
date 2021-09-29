
import React from "react";
import PropTypes from "prop-types";
import ArgoGroupKindInputBase from "components/common/list_of_values_input/tools/argo_cd/ArgoGroupKindInputBase";

function ArgoGroupKindInput({ dataObject, setDataObject, disabled, fieldName}) {
  return (
    <ArgoGroupKindInputBase
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={true}
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