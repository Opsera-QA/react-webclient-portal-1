import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const AZURE_CLUSTER_TYPES = [
  {
    name: "Public",
    value: "public",
  },
  {
    name: "Private",
    value: "private",
  },
];

function AzureClusterTypeSelectInput({model, setModel, isLoading, disabled}) {

  return (
     <SelectInputBase
       fieldName={"clusterType"}
       dataObject={model}
       setDataObject={setModel}
       selectOptions={AZURE_CLUSTER_TYPES}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Cluster Type"}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

AzureClusterTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default AzureClusterTypeSelectInput;