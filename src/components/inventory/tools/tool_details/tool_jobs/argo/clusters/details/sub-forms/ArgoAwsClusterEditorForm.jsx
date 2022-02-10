import React from 'react';
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import ArgoClusterAwsToolSelectInput from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/details/inputs/ArgoClusterAwsToolSelectInput";
import ArgoClusterRolesSelectInput from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/details/inputs/ArgoClusterRolesSelectInput";
import ArgoClusterIAmRoleFlagToggleInput from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/details/inputs/ArgoClusterIAmRoleFlagToggleInput";
import ArgoAwsClusterSelectInput from "../inputs/ArgoAwsClusterSelectInput";
import ArgoAwsIamClusterSelectInput from "../inputs/ArgoAwsIamClusterSelectInput";

const ArgoAwsClusterEditorForm = ({ model, setModel, clusterData, disabled }) => {
  
  const getIamRoleFields = () => {
    if (model?.getData('iamRoleFlag') === true) {
      return (
        <>
          <Col lg={12}>
            <ArgoClusterRolesSelectInput
              model={model}
              setModel={setModel}
              disabled={model?.getData("platformToolId").length === 0}
              toolConfigId={model?.getData("platformToolId")}
            />
          </Col>
          {model && model.getData("roleArn") && 
            <Col lg={12}>
              <ArgoAwsIamClusterSelectInput 
                model={model}
                setModel={setModel}
                clusterData={clusterData}
                disabled={disabled || ( model && model.getData("platformToolId") === "" &&  model.getData("roleArn") === "" ) }
                awsToolConfigId={model && model.getData("platformToolId")}
                awsIamRole={model && model.getData("roleArn")}
                awsIamRoleName={model && model.getData("roleSessionName")}
              />
            </Col>
          }
      </>
      );
    } else {
      return (
        <Col lg={12}>
          <ArgoAwsClusterSelectInput 
            model={model}
            setModel={setModel}
            clusterData={clusterData}
            disabled={disabled || ( model && model.getData("platformToolId") === "" ) }
            awsToolConfigId={model && model.getData("platformToolId")}
          />
        </Col>
      );
    }
  };

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
        <ArgoClusterIAmRoleFlagToggleInput model={model} setModel={setModel} />
      </Col>
      {getIamRoleFields()}
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
