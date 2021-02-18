import React, { useState, useContext }  from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DateRangeInput from "components/common/inputs/date/DateRangeInput";
import DtoTagManagerFilterInput from "../../../common/input/dto_input/dto-tag-manager-filter-input";
import LenientSaveButton from "../../../common/buttons/saving/LenientSaveButton";
import CancelButton from "../../../common/buttons/CancelButton";
import kpiConfigurationMetadata from "../kpi-configuration-metadata";
import {kpiDateFilterMetadata, kpiTagsFilterMetadata} from "../kpi-configuration-metadata";
import Model from "../../../../core/data_model/model";
import dashboardsActions from "../../dashboards/dashboards-actions";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";


function KpiSettingsForm({kpiConfiguration, setKpiConfiguration, dashboardData, index, setView, loadChart, setKpis}) {
    const { getAccessToken } = useContext(AuthContext);
    const [kpiSettings, setKpiSettings] = useState(new Model(kpiConfiguration, kpiConfigurationMetadata, false));
    const [kpiDateFilter, setKpiDateFilter] = useState(new Model(kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")], kpiDateFilterMetadata, false))
    const [kpiTagsFilter, setKpiTagsFilter] = useState(new Model(kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "tags")], kpiTagsFilterMetadata, false))
    const tagFilterEnabled = ["opsera-pipeline-duration", "opsera-pipelines-by-user", "opsera-deployment-frequency", "opsera-recent-pipeline-status", "opsera-status-by-pipeline", 
                              "jenkins-builds-by-user", "jenkins-build-duration", "jenkins-status-by-job-name", "jenkins-recent-build-status", 
                              "sonar-code-smells", "sonar-maintainability-rating", "sonar-bugs", "sonar-new-bugs", "sonar-reliability-rating", "sonar-reliability-remediation-effort",
                              "sonar-vulnerabilities-by-project", "sonar-new-vulnerabilities-by-project", "sonar-new-technical-debt-by-project", "sonar-code-smells-by-project", 
                              "sonar-code-coverage", "sonar-lines-to-cover", "jira-tickets-assigned-by-user", "jira-issues-created-vs-resolved", "jira-velocity-report", 
                              "jira-sprint-burndown", "jira-health-by-sprint", "jira-issues-by-priority", "jira-issues-assigned-to-me", "gitlab-merge-request-by-maximum-time", 
                              "gitlab-merge-requests-by-user", "gitlab-time-taken-to-complete-merge-request-review", "gitlab-merge-requests-pushes-and-comments",
                              "gitlab-total-commits-by-project", "gitlab-commits-by-author", "gitlab-recent-merge-requests", "gitlab-most-active-contributors", "cypress-test-results",
                              "junit-test-results", "xunit-test-results", "jmeter-hits", "jmeter-errors", "jmeter-throughput", "jmeter-response-time", "jmeter-connect-time",
                              "anchore-vulnerability-severity-by-package", "anchore-vulnerabilities-by-date"];

    const getKpiFilters = (filter) => {
        switch (filter.type) {
            case "date":
                return (
                    <div>
                        <DateRangeInput dataObject={kpiDateFilter} setDataObject={setKpiDateFilter} fieldName={"value"} />
                    </div>
                );
            case "tags":
                return (
                    <div>
                        <DtoTagManagerFilterInput type={"kpi_filter"} fieldName={"value"} setDataObject={setKpiTagsFilter} dataObject={kpiTagsFilter} disabled={!tagFilterEnabled.includes(kpiSettings.getData("kpi_identifier"))}/>
                    </div>
                );
        }
    }
      
    const saveKpiSettings = async () => {
        let newKpiSettings = kpiSettings;
        if (newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "date")]) {
            newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "date")].value = kpiDateFilter.getData("value");
        }
        if (newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "tags")]) {
            newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "tags")].value = kpiTagsFilter.getData("value");
        }
        setKpiSettings({ ...newKpiSettings });
        dashboardData.getData("configuration")[index] = kpiSettings.data;
        setKpiConfiguration(kpiSettings.data);
        loadChart(dashboardData);
        setView("chart");
        return await dashboardsActions.update(dashboardData, getAccessToken);
    }

    const cancelKpiSettings = async () => {
        setKpiSettings(dashboardData.getData("configuration")[index]);
        setView("chart");
    }

    const deleteKpi = async () => {
        dashboardData.getData("configuration").splice(index, 1);
        setKpis(dashboardData.getData("configuration"));
        setView("chart");
        return await dashboardsActions.update(dashboardData, getAccessToken);
    }
    
    return (
        <EditorPanelContainer showRequiredFieldsMessage={false}>
        <DtoTextInput fieldName={"kpi_name"} dataObject={kpiSettings} setDataObject={setKpiSettings}/>
        {kpiSettings.getData("filters").map((filter, index) => 
            <div className="form-group m-2" key={index}> 
            {getKpiFilters(filter)}  
            </div>
        )}
        <SaveButtonContainer>
        <LenientSaveButton
            recordDto={kpiSettings}
            updateRecord={saveKpiSettings}
            showSuccessToasts={false}
        />
        <CancelButton
            size="md"
            cancelFunction={cancelKpiSettings}/>
        </SaveButtonContainer>
        <ActionBarDeleteButton2
            relocationPath={`/insights/dashboards/${dashboardData.getData("_id")}`}
            dataObject={kpiSettings}
            handleDelete={deleteKpi}
            />
        </EditorPanelContainer>
        )
}

KpiSettingsForm.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setView: PropTypes.func,
    setKpiConfiguration: PropTypes.func,
    setKpis: PropTypes.func,
    loadChart: PropTypes.func
}

export default KpiSettingsForm;

