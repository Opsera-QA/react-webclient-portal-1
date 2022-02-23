import React from "react";
import PropTypes from "prop-types";
import UserEditableMetricStrategicCriteriaPanel
  from "components/common/inputs/metric/data_points/strategic_criteria/UserEditableMetricStrategicCriteriaPanel";
import InfoContainer from "components/common/containers/InfoContainer";

function UserEditableMetricDataPointInputBase(
  {
    model,
    setModel,
    dataPoint,
  }) {
  return (
    <InfoContainer titleText={`${dataPoint?.name} Data Point`}>
      <span className={"mb-2"}>{dataPoint?.description}</span>
      <UserEditableMetricStrategicCriteriaPanel
        model={model}
        setModel={setModel}
        strategicCriteria={dataPoint?.strategic_criteria}
      />
    </InfoContainer>
  );
}

UserEditableMetricDataPointInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  dataPoint: PropTypes.object,
};

export default UserEditableMetricDataPointInputBase;