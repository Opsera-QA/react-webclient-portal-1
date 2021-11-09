import React from "react";
import PropTypes from "prop-types";
import SdlcDurationStatisticsGoals from "components/insights/marketplace/charts/goals/sdlc_duration_statistics/SdlcDurationStatisticsGoals";

import SalesforceDurationByStageGoals from "components/insights/marketplace/charts/goals/salesforce_duration_by_stage/SalesforceDurationByStageGoals";

function GoalsInputBase({ dataObject, setDataObject, kpiName }) {
  switch (kpiName) {
    case "salesforce-duration-by-stage":
      return (
        <SalesforceDurationByStageGoals kpiConfigurationData={dataObject} setKpiConfigurationData={setDataObject} />
      );
    case "opsera-duration-by-stage":
      return (
        <SalesforceDurationByStageGoals kpiConfigurationData={dataObject} setKpiConfigurationData={setDataObject} />
      );
    case "sdlc-duration-statistics":
      return <SdlcDurationStatisticsGoals
        kpiConfigurationData={dataObject}
        setKpiConfigurationData={setDataObject}
      />;
  }
}

GoalsInputBase.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  kpiName: PropTypes.string,
};

GoalsInputBase.defaultProps = {
  fieldName: "value",
};

export default GoalsInputBase;
