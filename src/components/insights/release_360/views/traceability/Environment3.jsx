import React from "react";
import PropTypes from "prop-types";
import TotalTestsE1 from "./security/TotalTestsE1";
import TotalScansE1 from "./scans/TotalScansE1";
import TotalBuildsE1 from "./builds/TotalBuildsE1";
import DeploymentsE1 from "./deployments/DeploymentsE1";
import HorizontalDataBlocksContainer
  from "../../../../common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";

function Environment3({dashboardData}) {
  let BuildData = <TotalBuildsE1 dashboardData={dashboardData} environment= {"e3"}></TotalBuildsE1>;
  let ScansData = <TotalScansE1  dashboardData={dashboardData} environment= {"e3"}></TotalScansE1>;
  let TestData = <TotalTestsE1 dashboardData={dashboardData} environment= {"e3"} ></TotalTestsE1>;
  let DeploymentData =
    <DeploymentsE1 environment= {"e3"}  ></DeploymentsE1>;
  return (
    <HorizontalDataBlocksContainer
      title={"E3 Summary"}
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

Environment3.propTypes = {
  dashboardData: PropTypes.object,
  environment: PropTypes.string
};

export default Environment3;