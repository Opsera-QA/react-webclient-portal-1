import React, { useState } from "react";
import PropTypes from "prop-types";
import TerraformRemoteStateCloudSelect from "../inputs/TerraformRemoteStateCloudSelect";
import BackendStateAzure from "./BackendStateAzure";
import BackendStateAWS from "./BackendStateAWS";
import BackendStateTerraformCloud from "./BackendStateTerraformCloud";

function TerraformStateSubForm({ model, setModel}) {
  return (
    <>
      <TerraformRemoteStateCloudSelect dataObject={model} setDataObject={setModel} />
      <BackendStateAzure model={model} setModel={setModel} />
      <BackendStateAWS model={model} setModel={setModel} />
      <BackendStateTerraformCloud model={model} setModel={setModel} />
    </>
  );
}

TerraformStateSubForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func
};

export default TerraformStateSubForm;
