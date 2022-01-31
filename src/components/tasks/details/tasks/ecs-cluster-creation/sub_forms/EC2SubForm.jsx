import React, { useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import CreateVPCToggle from "../inputs/CreateVPCToggle";
import TextInputBase from "../../../../../common/inputs/text/TextInputBase";
import VpcSelectInput from "../inputs/VpcSelectInput";
import SubnetSelectInput from "../inputs/SubnetSelectInput";
import ImageTypeSelectInput from "../inputs/ImageTypeSelect";
import InstanceTypeSelectInput from "../inputs/InstanceTypeInput";
import SecurityGroupSelectInput from "../inputs/SecurityGroupsInput";
import KeyPairSelectInput from "../inputs/KeyPairsInput";

function EC2SubForm({ dataObject, setDataObject, disabled }) {
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
    } else {
      return (
        <>
          <VpcSelectInput
            dataObject={dataObject}
            setDataObject={setDataObject}
            disabled={dataObject?.getData("awsToolId").length === 0}
            awstoolId={dataObject?.getData("awsToolId")}
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
      <InstanceTypeSelectInput
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={dataObject?.getData("awsToolId").length === 0}
        awstoolId={dataObject?.getData("imageType")}
      />
      <KeyPairSelectInput
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={dataObject?.getData("awsToolId").length === 0 || dataObject?.getData("region").length === 0}
        awstoolId={dataObject?.getData("awsToolId")}
        region={dataObject?.getData("region")}
      />
      {getDynamicFields()}
      <SecurityGroupSelectInput
        dataObject={dataObject}
        setDataObject={setDataObject}
        disabled={dataObject?.getData("awsToolId").length === 0}
        awstoolId={dataObject?.getData("awsToolId")}
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
