import React, { useState } from "react";
import PropTypes from "prop-types";
import TerraformS3BucketSelectInput from "../inputs/aws/TerraformS3BucketSelectInput";
import TerraformS3BucketRegionSelectInput from "../inputs/aws/TerraformS3BucketRegionSelectInput";

function BackendStateAzure({ model, setModel}) {

  if (!model?.getData("backendState") || model?.getData("backendState") !== "S3") {
    return null;
  }

  return (
    <>
      <TerraformS3BucketSelectInput dataObject={model} setDataObject={setModel} />
      <TerraformS3BucketRegionSelectInput dataObject={model} setDataObject={setModel} fieldName="bucketRegion" />
    </>
  );
}

BackendStateAzure.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func
};

export default BackendStateAzure;
