import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import JenkinsMetricDeploymentStageFilterInput from "components/common/inputs/metric/filters/deployment-frequency/JenkinsMetricDeploymentStageFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import { jenkinsDeploymentFrequencyMetadata } from "./jenkinsDeploymentFrequency.metadata";

function JenkinsDeploymentFrequencyEditorPanel({
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
          jenkinsDeploymentFrequencyMetadata,
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
      <JenkinsMetricDeploymentStageFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
      <MetricDateRangeFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
    </div>
  );
}

JenkinsDeploymentFrequencyEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
};

export default JenkinsDeploymentFrequencyEditorPanel;
