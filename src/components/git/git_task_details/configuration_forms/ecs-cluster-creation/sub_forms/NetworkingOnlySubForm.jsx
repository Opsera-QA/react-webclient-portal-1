import React, { useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import CreateVPCToggle from "../inputs/CreateVPCToggle";
import TextInputBase from "../../../../../common/inputs/text/TextInputBase";

function NetworkingOnlySubForm({ dataObject, setDataObject, disabled }) {
  const getDynamicFields = () => {
    if (dataObject?.getData("createVpc")) {
      return (
        <>
            <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"vpcCidrBlock"} />
            <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"subnet_1"} />
            <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"subnet_2"} />
            <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"subnet_3"} />
        </>
      );
    }
  };

  return (
    <>
      <CreateVPCToggle dataObject={dataObject} setDataObject={setDataObject} fieldName={"createVpc"} />
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
