import React from "react";
import PropTypes from "prop-types";
import UserEditableMetricStrategicCriteriaPanel
  from "components/common/inputs/metric/data_points/strategic_criteria/UserEditableMetricStrategicCriteriaPanel";
import MetricDataPointVisibilityInput
  from "components/common/inputs/metric/data_points/visibility/MetricDataPointVisibilityInput";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";

function UserEditableMetricDataPointInputBase(
  {
    model,
    setModel,
    dataPoint,
  }) {

  const getDataPointVisibilityInput = () => {
    if (dataPointHelpers.canUserToggleVisibility(dataPoint) === true) {
      return (
        <MetricDataPointVisibilityInput
          model={model}
          setModel={setModel}
          fromDashboardMetric={true}
        />
      );
    }
  };

  // TODO: Show read only view if not editable
  const getDataPointStrategicCriteriaInput = () => {
    if (dataPointHelpers.canUserEditStrategicCriteria(dataPoint) === true) {
      return (
        <UserEditableMetricStrategicCriteriaPanel
          model={model}
          setModel={setModel}
          strategicCriteria={dataPoint?.strategic_criteria}
        />
      );
    }
  };

  return (
    <div className={"m-1"}>
      <span className={"mb-2 mx-2"}>{dataPoint?.description}</span>
      <div className={"m-3"}>
        {getDataPointVisibilityInput()}
        {getDataPointStrategicCriteriaInput()}
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