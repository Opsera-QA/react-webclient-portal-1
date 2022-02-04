import React from 'react';
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import ArgoClusterAzureToolSelectInput from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/details/inputs/ArgoClusterAzureToolSelectInput";
import ArgoAzureClusterSelectInput from "../inputs/ArgoAzureClusterSelectInput";
import ArgoAzureApplicationSelectInput from "../inputs/ArgoAzureApplicationSelectInput";
import ArgoAzureResourceGroupSelectInput from "../inputs/ArgoAzureResourceGroupSelectInput";

const ArgoAzureClusterEditorForm = ({ model, setModel, disabled, clusterData }) => {

  return (
    <>
      <Col lg={12}>
        <ArgoClusterAzureToolSelectInput
          model={model}
          setModel={setModel}
          disabled={disabled}
        />
      </Col>
      <Col lg={12}>
        <ArgoAzureApplicationSelectInput 
          model={model}
          setModel={setModel}
        />
      </Col>      
      <Col lg={12}>
        <ArgoAzureClusterSelectInput 
          model={model}
          setModel={setModel}
          clusterData={clusterData}
          disabled={disabled || ( model && model.getData("platformToolId") === "" )}
          azureToolConfigId={model && model.getData("platformToolId")}
          applicationId={model && model.getData("azureApplicationId")}
        />
      </Col>
      <Col lg={12}>
        <ArgoAzureResourceGroupSelectInput 
          model={model}
          setModel={setModel}
          azureToolConfigId={model && model.getData("platformToolId")}
          azureApplication={model && model.getData("azureApplicationId")}
          clusterName={model && model.getData("clusterName")}          
        />
      </Col>      
    </>
  );
};

ArgoAzureClusterEditorForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  clusterData: PropTypes.array,
};

export default ArgoAzureClusterEditorForm;