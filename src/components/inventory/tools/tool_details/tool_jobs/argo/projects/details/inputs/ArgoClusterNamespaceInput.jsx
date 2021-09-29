
import React from "react";
import PropTypes from "prop-types";
import ArgoClusterNameSpaceInputBase from "components/common/list_of_values_input/tools/argo_cd/ArgoClusterNameSpaceInputBase";

function ArgoClusterNamespaceInput({ dataObject, setDataObject, disabled, fieldName}) {
  return (
    <ArgoClusterNameSpaceInputBase
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={false}
      disabled={disabled}
    />
  );
}

ArgoClusterNamespaceInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

ArgoClusterNamespaceInput.defaultProps = {
  fieldName: "destinations"
};

export default ArgoClusterNamespaceInput;