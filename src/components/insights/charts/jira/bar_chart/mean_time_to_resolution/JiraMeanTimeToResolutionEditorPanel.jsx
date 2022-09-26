import React, {useEffect} from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import {jiraMeanTimeToResolutionMetadata} from "./jiraMeanTimeToResolution.metadata";
import MetricJiraPrioritiesFilterInput
  from "components/common/inputs/metric/filters/jira/MetricJiraPrioritiesFilterInput";
import MetricJiraProjectsFilterInput
  from "../../../../../common/inputs/metric/filters/jira/MetricJiraProjectsFilterInput";
import MetricJiraServiceComponentsFilterInput from 'components/common/inputs/metric/filters/jira/MetricJiraServiceComponentsFilterInput';

function JiraMeanTimeToResolutionEditorPanel(
  {
    metricModel,
    unpackedFilterData,
    metricFilterModel,
    setMetricFilterModel
  }) {
  useEffect(() => {
    setMetricFilterModel(undefined);

    if (unpackedFilterData) {
      setMetricFilterModel(modelHelpers.parseObjectIntoModel(unpackedFilterData, jiraMeanTimeToResolutionMetadata));
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
      <MetricJiraPrioritiesFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
      <MetricJiraProjectsFilterInput
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
        metricModel={metricModel}
      />
      <MetricJiraServiceComponentsFilterInput
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

JiraMeanTimeToResolutionEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func
};

export default JiraMeanTimeToResolutionEditorPanel;
