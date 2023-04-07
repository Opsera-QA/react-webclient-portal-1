import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import MetricGithubRepositoryFilterInput from "components/common/inputs/metric/filters/MetricGithubRepositoryFilterInput";
import MetricGithubBranchFilterInput from "components/common/inputs/metric/filters/MetricGithubBranchFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import { githubMergeRequestsPushesAndCommentsMetadata } from "./githubMergeRequestsPushesAndComments.metadata";

function GithubMergeRequestsPushesAndCommentsEditorPanel({
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
          githubMergeRequestsPushesAndCommentsMetadata,
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

GithubMergeRequestsPushesAndCommentsEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
};

export default GithubMergeRequestsPushesAndCommentsEditorPanel;
