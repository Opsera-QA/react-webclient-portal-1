import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import UserEditableMetricDataPointTabPanel
  from "components/common/inputs/metric/data_points/UserEditableMetricDataPointTabPanel";

function UserEditableMetricDataPointsInputPanel(
  {
    model,
    setModel,
  }) {
  if (model == null || model?.getArrayData("dataPoints")?.length === 0) {
    return null;
  }

  return (
    <InfoContainer
      titleText={`${model?.getData("kpi_name")} Data Points`}
    >
      <UserEditableMetricDataPointTabPanel
        model={model}
        setModel={setModel}
        dataPoints={model?.getArrayData("dataPoints")}
      />
    </InfoContainer>
  );
}

UserEditableMetricDataPointsInputPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  dataPoint: PropTypes.object,
};

export default UserEditableMetricDataPointsInputPanel;