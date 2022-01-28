import React from 'react';
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import ArgoClusterAwsToolSelectInput from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/details/inputs/ArgoClusterAwsToolSelectInput";
import ArgoAwsClusterSelectInput from "../inputs/ArgoAwsClusterSelectInput";

const ArgoAwsClusterEditorForm = ({ model, setModel, clusterData, disabled }) => {
  return (
    <>
      <Col lg={12}>
        <ArgoClusterAwsToolSelectInput
          model={model}
          setModel={setModel}
          disabled={disabled}
        />
      </Col>
      <Col lg={12}>
        <ArgoAwsClusterSelectInput 
          model={model}
          setModel={setModel}
          clusterData={clusterData}
          disabled={disabled || ( model && model.getData("platformToolId") === "" ) }
          awsToolConfigId={model && model.getData("platformToolId")}
        />
      </Col>      
    </>
  );
};

ArgoAwsClusterEditorForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  clusterData: PropTypes.array,
};

export default ArgoAwsClusterEditorForm;
