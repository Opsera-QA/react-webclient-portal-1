import React, { useState } from "react";
import PropTypes from "prop-types";
import HelmS3BucketSelectInput from "../inputs/aws/HelmS3BucketSelectInput";
import HelmS3BucketRegionSelectInput from "../inputs/aws/HelmS3BucketRegionSelectInput";

function BackendStateAzure({ model, setModel}) {

  if (!model?.getData("backendState") || model?.getData("backendState") !== "S3") {
    return null;
  }

  return (
    <>
      <HelmS3BucketSelectInput dataObject={model} setDataObject={setModel} />
      <HelmS3BucketRegionSelectInput dataObject={model} setDataObject={setModel} fieldName="bucketRegion" />
    </>
  );
}

BackendStateAzure.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func
};

export default BackendStateAzure;
