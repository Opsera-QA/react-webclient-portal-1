import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import DashboardMetricDataPointTabPanel from "components/common/inputs/metric/data_points/dashboard/DashboardMetricDataPointTabPanel";

function DashboardMetricDataPointsInputPanel(
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
      titleClassName={"dashboard-container-header"}
    >
      <DashboardMetricDataPointTabPanel
        model={model}
        setModel={setModel}
        dataPoints={model?.getArrayData("dataPoints")}
      />
    </InfoContainer>
  );
}

DashboardMetricDataPointsInputPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default DashboardMetricDataPointsInputPanel;