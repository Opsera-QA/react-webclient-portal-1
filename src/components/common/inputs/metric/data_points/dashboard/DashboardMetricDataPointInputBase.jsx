import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DashboardMetricStrategicCriteriaPanel
  from "components/common/inputs/metric/data_points/dashboard/strategic_criteria/DashboardMetricStrategicCriteriaPanel";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DashboardMetricDataPointVisibilityInput
  from "components/common/inputs/metric/data_points/dashboard/visibility/DashboardMetricDataPointVisibilityInput";
import modelHelpers from "components/common/model/modelHelpers";
import kpiDataPointMetadata from "components/common/inputs/metric/data_points/kpiDataPoint.metadata";
import DataPointStrategicCriteriaInfoPanel
  from "components/common/metrics/panels/strategic_criteria/data_point/DataPointStrategicCriteriaInfoPanel";

function DashboardMetricDataPointInputBase(
  {
    dataPoint,
    updateDataPoint,
  }) {
  const [dataPointModel, setDataPointModel] = useState(undefined);

  useEffect(() => {
    const newModel = modelHelpers.parseObjectIntoModel(dataPoint, kpiDataPointMetadata);
    setDataPointModel(newModel);
  }, [dataPoint]);

  const setDataFunction = (newDataPointModel) => {
    const newDataPoint = newDataPointModel?.getPersistData();
    setDataPointModel({...newDataPointModel});
    updateDataPoint(newDataPoint);
  };

  const getDataPointVisibilityInput = () => {
    if (dataPointHelpers.canUserToggleVisibility(dataPoint) === true) {
      return (
        <DashboardMetricDataPointVisibilityInput
          model={dataPointModel}
          setModel={setDataFunction}
          dataPoint={dataPoint}
          fromDashboardMetric={true}
          className={"mb-3"}
        />
      );
    }
  };

  // TODO: Show read only view if not editable
  const getDataPointStrategicCriteriaInput = () => {
    if (dataPointHelpers.canUserEditStrategicCriteria(dataPoint) === true) {
      return (
        <DashboardMetricStrategicCriteriaPanel
          model={dataPointModel}
          setModel={setDataFunction}
          strategicCriteria={dataPoint?.strategic_criteria}
        />
      );
    }

    return (
      <DataPointStrategicCriteriaInfoPanel
        strategicCriteria={dataPointModel?.getData("strategic_criteria")}
      />
    );
  };

  const getDescription = () => {
    if (hasStringValue(dataPoint?.description) === true) {
      return (
        <span className={"mb-2 mx-2"}>
          {dataPoint?.description}
        </span>
      );
    }
  };

  return (
    <div className={"m-1"}>
      {getDescription()}
      <div className={"m-3"}>
        {getDataPointVisibilityInput()}
        {getDataPointStrategicCriteriaInput()}
      </div>
    </div>
  );
}

DashboardMetricDataPointInputBase.propTypes = {
  dataPoint: PropTypes.object,
  updateDataPoint: PropTypes.func,
};

export default DashboardMetricDataPointInputBase;