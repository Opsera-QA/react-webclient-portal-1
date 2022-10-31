import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const ACTION_LIST = [
  {
    name: "Networking/Fargate",
    value: "fargate",
  },
  {
    name: "EC2",
    value: "ec2",
  },
];

function ClusterTemplateSelectInput({dataObject, setDataObject, isLoading, disabled}) {
  return (
    <SelectInputBase
      fieldName={"clusterTemplate"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={ACTION_LIST}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Cluster Template"}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

ClusterTemplateSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ClusterTemplateSelectInput;