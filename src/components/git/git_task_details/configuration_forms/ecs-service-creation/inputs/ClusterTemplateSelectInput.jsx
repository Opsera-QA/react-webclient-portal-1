import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function ClusterTemplateSelectInput({dataObject, setDataObject, isLoading, disabled}) {

  const ACTION_LIST = [
    {
      name: "Fargate",
      value: "FARGATE",
    },
    {
      name: "EC2",
      value: "EC2",
    },
  ];

  return (

    <SelectInputBase
      fieldName={"requiresCompatibilities"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={ACTION_LIST}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Required Compatibilities"}
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