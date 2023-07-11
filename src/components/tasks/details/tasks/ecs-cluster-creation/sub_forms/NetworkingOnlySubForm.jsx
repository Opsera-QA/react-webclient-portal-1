import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInputBase from "../../../../../common/inputs/text/TextInputBase";
import EcsCreationTaskVpcBooleanToggleInput from "components/tasks/details/tasks/ecs-cluster-creation/inputs/EcsCreationTaskVpcBooleanToggleInput";

function NetworkingOnlySubForm({ dataObject, setDataObject, disabled }) {
  const getDynamicFields = () => {
    if (dataObject?.getData("createVpc")) {
      return (
        <>
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"vpcCidrBlock"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"public_subnet_cidr_1"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"public_subnet_cidr_2"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"private_subnet_cidr_1"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"private_subnet_cidr_2"} />
        </>
      );
    }
  };

  return (
    <>
      <EcsCreationTaskVpcBooleanToggleInput
        model={dataObject}
        setModel={setDataObject}
        fieldName={"createVpc"}
      />
      {getDynamicFields()}
    </>
  );
}

NetworkingOnlySubForm.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default NetworkingOnlySubForm;
