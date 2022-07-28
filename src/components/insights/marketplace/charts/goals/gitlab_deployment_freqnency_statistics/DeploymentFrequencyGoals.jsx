import React, {useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import buildAndDeployGoalsMetadata
  from "components/insights/marketplace/charts/goals/build_and_deploy_statistics/build-and-deploy-goals-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PositiveIntegerNumberPickerInput from "components/common/inputs/number/picker/PositiveIntegerNumberPickerInput";

function DeploymentFrequencyGoals({ kpiConfigurationData, setKpiConfigurationData }) {

  const [deploymentFrequencyGoalsConfigurationData, setDeploymentFrequencyGoalsConfigurationData] = 
      useState(new Model(kpiConfigurationData.getData("value"), buildAndDeployGoalsMetadata, false));
  
  kpiConfigurationData.setData("value", deploymentFrequencyGoalsConfigurationData.data);

  return (
    <Row className={"mx-0"}>      
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput 
          dataObject={deploymentFrequencyGoalsConfigurationData} 
          setDataObject={setDeploymentFrequencyGoalsConfigurationData} 
          fieldName={"deployment_frequency_rate"} 
        />
      </Col> 
    </Row>
  );
}

DeploymentFrequencyGoals.propTypes = {
  analyticsDataEntryModel: PropTypes.object,
  kpiConfigurationData: PropTypes.object,
  setKpiConfigurationData: PropTypes.func,
};

export default DeploymentFrequencyGoals;
