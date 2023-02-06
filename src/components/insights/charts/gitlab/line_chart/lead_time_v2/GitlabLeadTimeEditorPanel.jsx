import React, {useEffect} from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import {gitlabLeadTimeMetadata} from "./gitlabLeadTime.metadata";
import MetricDeploymentStageFilterInputV2
    from "components/common/inputs/metric/filters/deployment-frequency/MetricsDeploymentStageFilterInputV2";
import MetricGitLabProjectFilterInput
    from "components/common/inputs/metric/filters/deployment-frequency/MetricGitLabProjectFilterInput";
function GitlabLeadTimeEditorPanelV2(
    {
        metricModel,
        unpackedFilterData,
        metricFilterModel,
        setMetricFilterModel,
    }) {
    useEffect(() => {
        setMetricFilterModel(undefined);

        if (unpackedFilterData) {
            setMetricFilterModel(modelHelpers.parseObjectIntoModel(unpackedFilterData, gitlabLeadTimeMetadata));
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
            <MetricDeploymentStageFilterInputV2
                metricModel={metricModel}
                metricFilterModel={metricFilterModel}
                setMetricFilterModel={setMetricFilterModel}
            />
            <MetricGitLabProjectFilterInput
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

GitlabLeadTimeEditorPanelV2.propTypes = {
    metricModel: PropTypes.object,
    unpackedFilterData: PropTypes.object,
    metricFilterModel: PropTypes.object,
    setMetricFilterModel: PropTypes.func,
};

export default GitlabLeadTimeEditorPanelV2;
