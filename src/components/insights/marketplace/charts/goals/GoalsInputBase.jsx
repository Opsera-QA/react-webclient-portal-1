import React from "react";
import PropTypes from "prop-types";
import SalesforceDurationByStageGoals from "components/insights/marketplace/charts/goals/salesforce_duration_by_stage/SalesforceDurationByStageGoals";

function GoalsInputBase({ fieldName, dataObject, setDataObject, kpiName }) {
  switch (kpiName) {
    case "salesforce-duration-by-stage":
      return (
        <SalesforceDurationByStageGoals kpiConfigurationData={dataObject} setKpiConfigurationData={setDataObject} />
      );
    case "opsera-duration-by-stage":
      return (
        <SalesforceDurationByStageGoals kpiConfigurationData={dataObject} setKpiConfigurationData={setDataObject} />
      );
  }
}

GoalsInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  kpiName: PropTypes.string,
};

GoalsInputBase.defaultProps = {
  fieldName: "value",
};

export default GoalsInputBase;
