import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import KpiSettingsForm from "../KpiSettingsForm";

import OpseraPipelineByStatusBarChart from "./opsera/bar_chart/pipeline_by_status/OpseraPipelineByStatusBarChart";
import OpseraBuildDurationBarChart from "./opsera/bar_chart/build_duration/OpseraBuildDurationBarChart";
import OpseraBuildsByUserBarChart from "./opsera/bar_chart/builds_by_user/OpseraBuildsByUserBarChart";
import OpseraDeploymentFrequencyLineChart from "./opsera/line_chart/deployment_frequency/OpseraDeploymentFrequencyLineChart";
import OpseraRecentPipelineStatus from "./opsera/OpseraRecentPipelineStatus";

function ChartView({kpiConfiguration, dashboardData, index}) {
    const [view, setView] = useState("chart");

    const getView = () => {
        if (view === "chart") {
            return getChart(kpiConfiguration);
        }
        if (view === "settings") {
            return getSettings(kpiConfiguration);
        }
    }

    const getSettings = (kpiConfiguration) => {
        return <KpiSettingsForm kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} index={index} setView={setView}/>
    }

    const getDateObject = (kpiConfiguration) => {
        if (kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")] &&
        kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value) {
            return ({
                "start": kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.startDate, 
                "end": kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.endDate
            })
        }
        return ({
            "start": "now-90d",
            "end": "now"
        });
    };

    const getChart = (kpiConfiguration) => {
        switch (kpiConfiguration.kpi_identifier) {
            case "opserstatusbypipeline":
                return (<OpseraPipelineByStatusBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
            case "opserabuildduration":
                return (<OpseraBuildDurationBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
            case "opserabuildbyuser":
                return (<OpseraBuildsByUserBarChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
            case "opseradeploymentfrequency":
                return (<OpseraDeploymentFrequencyLineChart persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
            case "opseradrecentpipelinestatus":
                return (<OpseraRecentPipelineStatus persona={"developer"} date={getDateObject(kpiConfiguration)}/>);
        }
    } 

    const changeView = () => {
        if (view === "chart") {
            setView("settings");
        }
        if (view === "settings") {
            setView("chart");
        }
    }

    return (
        <div className="p-2" style={{border: "1px solid rgba(0, 0, 0, 0.125)", minHeight: "365px"}}>
            {view==="chart" && <FontAwesomeIcon icon={faCogs} className="float-right pointer mr-2 mt-1" onClick= {() => { changeView(); }} />}
            <h5>{kpiConfiguration.kpi_name}</h5>
              {getView()}
        </div>
    )

}

ChartView.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number
}

export default ChartView;

