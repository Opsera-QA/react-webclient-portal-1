import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faCogs, faExclamationCircle, faSpinner} from "@fortawesome/pro-light-svg-icons";
import "components/analytics/charts/charts.css";
import KpiSettingsForm from "components/insights/marketplace/kpi_marketplace_detail_view/KpiSettingsForm";
import {getChartIconFromKpiConfiguration} from "components/insights/charts/charts-helpers";
import InfoDialog from "components/common/status_notifications/info";

function ChartContainer({ kpiConfiguration, setKpiConfiguration, dashboardData, index, chart, isLoading, error, loadChart, setKpis }) {
  const [view, setView] = useState("chart");

  const changeView = () => {
    setView(view === "chart" ? "settings" : "chart");
  }

  const getTitleBar = () => {
    if (isLoading) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Chart</span>);
    }
    else if (error) {
      return (<span><FontAwesomeIcon icon={faExclamationCircle} spin fixedWidth className="mr-1"/>Error Loading Chart!</span>)
    }
    else {
      return (
        <div className="d-flex justify-content-between">
          <div><FontAwesomeIcon icon={getChartIconFromKpiConfiguration(kpiConfiguration)} fixedWidth className="mr-1"/>{kpiConfiguration?.kpi_name}</div>
          <div><FontAwesomeIcon icon={faCogs} className="pointer" onClick={() => {changeView()}}/></div>
        </div>
      );
    }
  };

  const getChartBody = () => {
    if (error) {
      return (
        <span>There was an error loading this chart: {error.message}. Please check logs for more details.</span>
      );
    }

    if (view === "settings") {
      return(
        <KpiSettingsForm
          kpiConfiguration={kpiConfiguration}
          setKpiConfiguration={setKpiConfiguration}
          dashboardData={dashboardData}
          index={index}
          loadChart={loadChart}
          setKpis={setKpis}
          setView={setView}
        />
      );
    }

    if (chart === null && !isLoading) {
      return (
        <div className='max-content-width p-5 mt-5' style={{justifyContent: "center", alignItems: "center"}}>
          <InfoDialog message="No Data is available for this chart at this time."/>
        </div>
      );
    }

    if (chart === null && isLoading) {
      return <div className="m-3" />;
    }

    return (
      <div>
        {chart}
      </div>
    );
  };

  return (
    <div className="content-container content-card-1">
      <div className="px-2 content-block-header title-text-header-2">
        {getTitleBar()}
      </div>
      <div className="new-chart m-2 shaded-panel">
        {getChartBody()}
      </div>
    </div>
  );
}


ChartContainer.propTypes = {
  chart: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  loadChart: PropTypes.func
};

export default ChartContainer;