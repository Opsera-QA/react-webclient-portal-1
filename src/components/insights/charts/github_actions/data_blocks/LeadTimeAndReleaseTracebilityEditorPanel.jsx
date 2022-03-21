import React, {useEffect} from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import MetricAmexApplicationFilterInput from "components/common/inputs/metric/filters/MetricAmexApplicationFilterInput";
import MetricAmexDirectorFilterInput from "components/common/inputs/metric/filters/MetricAmexDirectorFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import {leadTimeAndReleaseTraceabilityMetadata} from "./leadTimeAndReleaseTracebility.metadata";

function LeadTimeAndReleaseTracebilityEditorPanel(
  {
    metricModel,
    unpackedFilterData,
    metricFilterModel,
    setMetricFilterModel,
  }) {
  useEffect(() => {
    setMetricFilterModel(undefined);

    if (unpackedFilterData) {
      setMetricFilterModel(modelHelpers.parseObjectIntoModel(unpackedFilterData, leadTimeAndReleaseTraceabilityMetadata));
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
      <MetricDateRangeFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
      <MetricAmexApplicationFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
      <MetricAmexDirectorFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
    </div>
  );
}

LeadTimeAndReleaseTracebilityEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
};

export default LeadTimeAndReleaseTracebilityEditorPanel;
