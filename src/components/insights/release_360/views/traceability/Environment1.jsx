import React from "react";
import PropTypes from "prop-types";
import TotalTestsE1 from "./security/TotalTestsE1";
import TotalScansE1 from "./scans/TotalScansE1";
import TotalBuildsE1 from "./builds/TotalBuildsE1";
import DeploymentsE1 from "./deployments/DeploymentsE1";
import HorizontalDataBlocksContainer
  from "../../../../common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";

function Environment1(kpiConfiguration, dashboardData) {
  let BuildData = <TotalBuildsE1 environment= {"e1"}></TotalBuildsE1>;
  let ScansData = <TotalScansE1  environment= {"e1"}></TotalScansE1>;
  let TestData = <TotalTestsE1 environment= {"e1"} ></TotalTestsE1>;
  let DeploymentData = 
    <DeploymentsE1 environment= {"e1"}  ></DeploymentsE1>;
  return (
    <HorizontalDataBlocksContainer
      title={"E1 Summary"}
    >
      <div className={"d-flex"}>
        {BuildData}
        {ScansData}
        {TestData}
        {DeploymentData} 
      </div>
    </HorizontalDataBlocksContainer>
  );
}
  
  Environment1.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    environment: PropTypes.string
  };
  
export default Environment1;
