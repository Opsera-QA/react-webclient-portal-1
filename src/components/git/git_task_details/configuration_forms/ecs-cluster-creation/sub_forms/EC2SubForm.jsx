import React, { useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import CreateVPCToggle from "../inputs/CreateVPCToggle";
import TextInputBase from "../../../../../common/inputs/text/TextInputBase";
import VPCSelectInput from "../inputs/VPCSelectInput";
import SubnetSelectInput from "../inputs/SubnetSelectInput";
import ImageTypeSelectInput from "../inputs/ImageTypeSelect";
import InstanceTypeSelectInput from "../inputs/InstanceTypeInput";
import SecurityGroupSelectInput from "../inputs/SecurityGroupsInput";

function EC2SubForm({ dataObject, setDataObject, disabled }) {
  const getDynamicFields = () => {
    if (dataObject?.getData("createVpc")) {
      return (
        <>
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"vpcCidrBlock"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"public_subnet_1"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"public_subnet_2"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"private_subnet_1"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"private_subnet_2"} />
        </>
      );
    } else {
      return (
        <>
          <VPCSelectInput
            dataObject={dataObject}
            setDataObject={setDataObject}
            disabled={dataObject?.getData("awsToolId").length === 0}
          />
          <SubnetSelectInput
            dataObject={dataObject}
            setDataObject={setDataObject}
            disabled={dataObject?.getData("vpcId").length === 0}
            vpc={dataObject?.getData("vpcId")}
          />
        </>
      );
    }
  };

  return (
    <>
      <ImageTypeSelectInput dataObject={dataObject} setDataObject={setDataObject} />
      <CreateVPCToggle dataObject={dataObject} setDataObject={setDataObject} fieldName={"createVpc"} />
      {getDynamicFields()}
      <InstanceTypeSelectInput
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={dataObject?.getData("imageType").length === 0}
        imageType={dataObject?.getData("imageType")}

      />
      <SecurityGroupSelectInput
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={dataObject?.getData("awsToolId").length === 0}
      />
    </>
  );
}

EC2SubForm.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EC2SubForm;
