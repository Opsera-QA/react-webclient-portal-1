import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import MetricDeploymentStageFilterInput from "components/common/inputs/metric/filters/deployment-frequency/MetricsDeploymentStageFilterInput";
import MetricGitLabProjectFilterInput from "components/common/inputs/metric/filters/deployment-frequency/MetricGitLabProjectFilterInput";
import MetricJiraProjectsFilterInput from "../../../../common/inputs/metric/filters/jira/MetricJiraProjectsFilterInput";
import MetricJiraChangeTypesFilterInput from "../../../../common/inputs/metric/filters/jira/MetricJiraChangeTypesFilterInput";
import MetricJiraResolutionNamesFilterInput from "../../../../common/inputs/metric/filters/jira/MetricJiraResolutionNamesFilterInput";
import {doraJiraGitlabRolledUpMetadata} from "../../dora/jira_gitlab_rolled_up/doraJiraGitlabRolledUp.metadata";
function GitLogCommitActivitiesEditorPanel({
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
                    doraJiraGitlabRolledUpMetadata,
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
            {/*<MetricDeploymentStageFilterInput*/}
            {/*    metricModel={metricModel}*/}
            {/*    metricFilterModel={metricFilterModel}*/}
            {/*    setMetricFilterModel={setMetricFilterModel}*/}
            {/*/>*/}
            {/*<MetricGitLabProjectFilterInput*/}
            {/*    metricModel={metricModel}*/}
            {/*    metricFilterModel={metricFilterModel}*/}
            {/*    setMetricFilterModel={setMetricFilterModel}*/}
            {/*/>*/}
            {/*<MetricJiraProjectsFilterInput*/}
            {/*    metricFilterModel={metricFilterModel}*/}
            {/*    setMetricFilterModel={setMetricFilterModel}*/}
            {/*    metricModel={metricModel}*/}
            {/*/>*/}
            <MetricDateRangeFilterInput
                metricModel={metricModel}
                metricFilterModel={metricFilterModel}
                setMetricFilterModel={setMetricFilterModel}
            />
        </div>
    );
}

GitLogCommitActivitiesEditorPanel.propTypes = {
    metricModel: PropTypes.object,
    unpackedFilterData: PropTypes.object,
    metricFilterModel: PropTypes.object,
    setMetricFilterModel: PropTypes.func,
};

export default GitLogCommitActivitiesEditorPanel;
