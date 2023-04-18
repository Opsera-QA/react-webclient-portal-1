import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import MetricGithubRepositoryFilterInput from "components/common/inputs/metric/filters/MetricGithubRepositoryFilterInput";
import MetricGithubBranchFilterInput from "components/common/inputs/metric/filters/MetricGithubBranchFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import { githubMostActiveContributorsMetadata } from "./githubMostActiveContributors.metadata";

function GithubMostActiveContributorsEditorPanel({
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
          githubMostActiveContributorsMetadata,
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
      <MetricGithubRepositoryFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
      <MetricGithubBranchFilterInput
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

GithubMostActiveContributorsEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
};

export default GithubMostActiveContributorsEditorPanel;
