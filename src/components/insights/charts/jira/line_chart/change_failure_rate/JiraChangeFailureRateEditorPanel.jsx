import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import { jiraChangeFailureRateMetadata } from "./jiraChangeFailureRate.metadata";
import MetricJiraProjectsFilterInput from "../../../../../common/inputs/metric/filters/jira/MetricJiraProjectsFilterInput";
import MetricJiraChangeTypesFilterInput from "../../../../../common/inputs/metric/filters/jira/MetricJiraChangeTypesFilterInput";
import MetricJiraServiceComponentsFilterInput from "../../../../../common/inputs/metric/filters/jira/MetricJiraServiceComponentsFilterInput";
import MetricJiraResolutionNamesFilterInput from "../../../../../common/inputs/metric/filters/jira/MetricJiraResolutionNamesFilterInput";
import MetricJiraExcludedResolutionNamesFilterInput from "../../../../../common/inputs/metric/filters/jira/MetricJiraExcludedResolutionNamesFilterInput";
import MetricJiraTeamNamesFilterInput from "components/common/inputs/metric/filters/jira/MetricJiraTeamNamesFilterInput";

function JiraChangeFailureRateEditorPanel({
  metricModel,
  unpackedFilterData,
  metricFilterModel,
  setMetricFilterModel,
}) {
  useEffect(() => {
    setMetricFilterModel(undefined);

    if (unpackedFilterData) {
      setMetricFilterModel(
        modelHelpers.parseObjectIntoModel(
          unpackedFilterData,
          jiraChangeFailureRateMetadata,
        ),
      );
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
      <MetricJiraServiceComponentsFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
      <MetricJiraResolutionNamesFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
      <MetricJiraExcludedResolutionNamesFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
      <MetricJiraTeamNamesFilterInput
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

JiraChangeFailureRateEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
};

export default JiraChangeFailureRateEditorPanel;
