import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import { systemDrivenMaturityMetadata } from "./systemDrivenMaturity.metadata";
import MetricDeploymentStageFilterInput from "components/common/inputs/metric/filters/deployment-frequency/MetricsDeploymentStageFilterInput";
import MetricGitLabProjectFilterInput from "components/common/inputs/metric/filters/deployment-frequency/MetricGitLabProjectFilterInput";
import MetricJiraProjectsFilterInput from "components/common/inputs/metric/filters/jira/MetricJiraProjectsFilterInput";
import MetricJiraChangeTypesFilterInput from "components/common/inputs/metric/filters/jira/MetricJiraChangeTypesFilterInput";
import MetricJiraResolutionNamesFilterInput from "components/common/inputs/metric/filters/jira/MetricJiraResolutionNamesFilterInput";
import MetricExcludedJiraResolutionNamesFilterInput from "components/common/inputs/metric/filters/jira/MetricJiraExcludedResolutionNamesFilterInput";

function SystemDrivenMaturityEditorPanel({
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
          systemDrivenMaturityMetadata,
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
      <MetricDeploymentStageFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
      <MetricGitLabProjectFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
      <MetricJiraProjectsFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
        fieldName="jira-projects-mttr"
      />
      <MetricJiraProjectsFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
        fieldName="jira-projects-cfr"
      />
      <MetricJiraResolutionNamesFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
        projectFieldName="jira-projects-cfr"
      />
      <MetricExcludedJiraResolutionNamesFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
        projectFieldName="jira-projects-cfr"
      />
      <MetricJiraChangeTypesFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
        projectFieldName="jira-projects-cfr"
      />
      <MetricDateRangeFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
    </div>
  );
}

SystemDrivenMaturityEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
};

export default SystemDrivenMaturityEditorPanel;
