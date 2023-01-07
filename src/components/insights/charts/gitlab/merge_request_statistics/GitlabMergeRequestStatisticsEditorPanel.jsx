import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import { gitlabMergeStatisticsMetadata } from "./gitlabMergeStatistics.metadata";
function GitlabMergeRequestStatisticsEditorPanel({
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
                    gitlabMergeStatisticsMetadata,
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
            <MetricDateRangeFilterInput
                metricModel={metricModel}
                metricFilterModel={metricFilterModel}
                setMetricFilterModel={setMetricFilterModel}
            />
        </div>
    );
}

GitlabMergeRequestStatisticsEditorPanel.propTypes = {
    metricModel: PropTypes.object,
    unpackedFilterData: PropTypes.object,
    metricFilterModel: PropTypes.object,
    setMetricFilterModel: PropTypes.func,
};

export default GitlabMergeRequestStatisticsEditorPanel;