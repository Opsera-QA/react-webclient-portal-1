import React, {useEffect} from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import {jiraChangeFailureRateMetadata} from "./jiraChangeFailureRate.metadata";
import MetricJiraProjectsFilterInput
    from "../../../../../common/inputs/metric/filters/jira/MetricJiraProjectsFilterInput";
import MetricJiraChangeTypesFilterInput
    from "../../../../../common/inputs/metric/filters/jira/MetricJiraChangeTypesFilterInput";
function JiraChangeFailureRateEditorPanel(
  {
    metricModel,
    unpackedFilterData,
    metricFilterModel,
    setMetricFilterModel
  }) {
  useEffect(() => {
    setMetricFilterModel(undefined);

    if (unpackedFilterData) {
      setMetricFilterModel(modelHelpers.parseObjectIntoModel(unpackedFilterData, jiraChangeFailureRateMetadata));
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
      {/*<MetricJiraProjectsFilterInput*/}
      {/*  metricFilterModel={metricFilterModel}*/}
      {/*  setMetricFilterModel={setMetricFilterModel}*/}
      {/*  metricModel={metricModel}*/}
      {/*  type="single"*/}
      {/*/>*/}
      {/*<MetricJiraChangeTypesFilterInput*/}
      {/*  metricFilterModel={metricFilterModel}*/}
      {/*  setMetricFilterModel={setMetricFilterModel}*/}
      {/*  metricModel={metricModel}*/}
      {/*/>*/}
      <MetricDateRangeFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
    </div>
  );
}

JiraChangeFailureRateEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
};

export default JiraChangeFailureRateEditorPanel;
