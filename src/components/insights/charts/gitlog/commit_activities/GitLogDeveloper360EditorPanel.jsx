import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import MetricGitLogAuthorFilterInput
    from "../../../../common/inputs/metric/filters/developer_360/MetricGitLogAuthorFilterInput";
import MetricGitLogBranchFilterInput
    from "../../../../common/inputs/metric/filters/developer_360/MetricGitLogBranchFilterInput";
import MetricGitLogRepositoryFilterInput
    from "../../../../common/inputs/metric/filters/developer_360/MetricGitLogRepositoryFilterInput";
import gitLogDeveloperActivitiesMetaData from "./gitlog-developer-360-metedata";
function GitLogDeveloper360EditorPanel({
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
                    gitLogDeveloperActivitiesMetaData,
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
            <MetricGitLogAuthorFilterInput
                metricModel={metricModel}
                metricFilterModel={metricFilterModel}
                setMetricFilterModel={setMetricFilterModel}
            />
            <MetricGitLogBranchFilterInput
                metricFilterModel={metricFilterModel}
                setMetricFilterModel={setMetricFilterModel}
                metricModel={metricModel}
            />
            <MetricGitLogRepositoryFilterInput
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

GitLogDeveloper360EditorPanel.propTypes = {
    metricModel: PropTypes.object,
    unpackedFilterData: PropTypes.object,
    metricFilterModel: PropTypes.object,
    setMetricFilterModel: PropTypes.func,
};

export default GitLogDeveloper360EditorPanel;
