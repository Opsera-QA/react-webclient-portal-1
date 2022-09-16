import React, {useEffect} from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import {changeFailureRateLineMetaData} from "./changeFailureRateLine.metadata";
import MetricJiraChangeFailureRateFilterInput from "components/common/inputs/metric/filters/jira/MetricJiraChangeFailureRateFilterInput";
import MetricJiraProjectsFilterInput from "components/common/inputs/metric/filters/jira/MetricJiraProjectsFilterInput";
import MetricJiraChangeTypesFilterInput
    from "../../../../common/inputs/metric/filters/jira/MetricJiraChangeTypesFilterInput";

function ChangeFailureRateLineChartEditorPanel(
  {
    metricModel,
    unpackedFilterData,
    metricFilterModel,
    setMetricFilterModel
  }) {
  useEffect(() => {
    setMetricFilterModel(undefined);

    if (unpackedFilterData) {
      setMetricFilterModel(modelHelpers.parseObjectIntoModel(unpackedFilterData, changeFailureRateLineMetaData));
    }

  }, [unpackedFilterData]);

  if (metricFilterModel == null) {
    return null;
  }

  return (
    <div>
      <MetricTagFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
      <MetricJiraProjectsFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
        type="single"
      />
      <MetricJiraChangeTypesFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
      <MetricDateRangeFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
    </div>
  );
}

ChangeFailureRateLineChartEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func
};

export default ChangeFailureRateLineChartEditorPanel;
