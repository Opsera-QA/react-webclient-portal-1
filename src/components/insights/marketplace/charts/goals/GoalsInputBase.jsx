import React from "react";
import PropTypes from "prop-types";
import SdlcDurationStatisticsGoals from "components/insights/marketplace/charts/goals/sdlc_duration_statistics/SdlcDurationStatisticsGoals";
function GoalsInputBase({ fieldName, dataObject, setDataObject, kpiName }) {
    switch (kpiName) {
        case "sdlc-duration-statistics":
          return <SdlcDurationStatisticsGoals
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
