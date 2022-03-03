import React from "react";
import PropTypes from "prop-types";
import UserEditableMetricStrategicCriteriaPanel
  from "components/common/inputs/metric/data_points/strategic_criteria/UserEditableMetricStrategicCriteriaPanel";
import MetricDataPointVisibilityInput
  from "components/common/inputs/metric/data_points/visibility/MetricDataPointVisibilityInput";

function UserEditableMetricDataPointInputBase(
  {
    model,
    setModel,
    dataPoint,
  }) {

  const getDataPointVisibilityInput = () => {
    if (dataPoint?.visibility?.userVisibilityToggleSupport === true) {
      return (
        <MetricDataPointVisibilityInput
          model={model}
          setModel={setModel}
          fromDashboardMetric={true}
        />
      );
    }
  };

  return (
    <div className={"m-1"}>
      <span className={"mb-2 mx-2"}>{dataPoint?.description}</span>
      <div className={"m-3"}>
        {getDataPointVisibilityInput()}
        <UserEditableMetricStrategicCriteriaPanel
          model={model}
          setModel={setModel}
          strategicCriteria={dataPoint?.strategic_criteria}
        />
      </div>
    </div>
  );
}

UserEditableMetricDataPointInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  dataPoint: PropTypes.object,
};

export default UserEditableMetricDataPointInputBase;