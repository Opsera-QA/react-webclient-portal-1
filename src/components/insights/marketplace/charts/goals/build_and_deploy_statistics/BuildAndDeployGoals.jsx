import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import buildAndDeployGoalsMetadata
  from "components/insights/marketplace/charts/goals/build_and_deploy_statistics/build-and-deploy-goals-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PositiveIntegerNumberPickerInput from "components/common/inputs/number/picker/PositiveIntegerNumberPickerInput";

function BuildAndDeployGoals({ kpiConfigurationData, setKpiConfigurationData }) {

  const [buildAndDeployGoalsConfigurationData, setBuildAndDeployGoalsConfigurationData] = 
      useState(new Model(kpiConfigurationData.getData("value"), buildAndDeployGoalsMetadata, false));
  
  kpiConfigurationData.setData("value", buildAndDeployGoalsConfigurationData.data);

  return (
    <Row className={"mx-0"}>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput 
          dataObject={buildAndDeployGoalsConfigurationData} 
          setDataObject={setBuildAndDeployGoalsConfigurationData} 
          fieldName={"build_success_rate"} 
        />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput 
          dataObject={buildAndDeployGoalsConfigurationData} 
          setDataObject={setBuildAndDeployGoalsConfigurationData} 
          fieldName={"average_builds"} 
        />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput 
          dataObject={buildAndDeployGoalsConfigurationData} 
          setDataObject={setBuildAndDeployGoalsConfigurationData} 
          fieldName={"deployment_success_rate"} 
        />
      </Col> 
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput 
          dataObject={buildAndDeployGoalsConfigurationData} 
          setDataObject={setBuildAndDeployGoalsConfigurationData} 
          fieldName={"average_deployments"} 
        />
      </Col> 
    </Row>
  );
}

BuildAndDeployGoals.propTypes = {
  analyticsDataEntryModel: PropTypes.object,
  kpiConfigurationData: PropTypes.object,
  setKpiConfigurationData: PropTypes.func,
};

export default BuildAndDeployGoals;
