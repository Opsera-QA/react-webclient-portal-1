import React from "react";
import PropTypes from "prop-types";
import BuildAndDeployGoals from "components/insights/marketplace/charts/goals/build_and_deploy_statistics/BuildAndDeployGoals";

function GoalsInputBase({ fieldName, dataObject, setDataObject, kpiName }) {    
    switch (kpiName) {        
        case "build-deployment-statistics":
            return <BuildAndDeployGoals 
                kpiConfigurationData={dataObject}
                setKpiConfigurationData={setDataObject}
            />;
    }
}

GoalsInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  kpiName: PropTypes.string
};

GoalsInputBase.defaultProps = {
  fieldName: "value",
};

export default GoalsInputBase;
