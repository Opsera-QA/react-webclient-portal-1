import React, { useState } from "react";
import PropTypes from "prop-types";
import TerraformRemoteStateCloudSelect from "../inputs/TerraformRemoteStateCloudSelect";
import BackendStateAzure from "./BackendStateAzure";
import BackendStateAWS from "./BackendStateAWS";
import BackendStateTerraformCloud from "./BackendStateTerraformCloud";
import TerraformRemoteStateToggleInput from "../inputs/TerraformRemoteStateToggleInput";
import TerraformStateMethodSelect from "../inputs/terraform_cloud/TerraformStateMethodSelect";

function TerraformStateSubForm({ model, setModel }) {
  return (
    <>
      <TerraformRemoteStateToggleInput dataObject={model} setDataObject={setModel} />
      {model?.getData("isStateRemote") && (
        <>
          <TerraformStateMethodSelect dataObject={model} setDataObject={setModel} />
          <TerraformRemoteStateCloudSelect dataObject={model} setDataObject={setModel} />
          {model?.getData("stateFile") === "manual" && (
            <>
              <BackendStateAzure model={model} setModel={setModel} />
              <BackendStateAWS model={model} setModel={setModel} />
              <BackendStateTerraformCloud model={model} setModel={setModel} />
            </>
          )}
        </>
      )}
    </>
  );
}

TerraformStateSubForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default TerraformStateSubForm;
