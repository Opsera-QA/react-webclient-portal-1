import React, {useState, useEffect, useContext, useRef} from "react";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "../../../../../common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import GithubActionsWorkflowDataBlocks from "./GithubActionsWorkflowDataBlocks";
import GithubActionsWorkflowTableOverlay from "./GithubActionsWorkflowTableOverlay";

function GithubActionsWorkflowChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis, showSettingsToggle}) {
  const isMounted = useRef(false);const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(dashboardData)]);

  const getChartBody = () => {
    return (
      <>
        <div className="new-chart m-3 all-github-actions-data-block">
          <GithubActionsWorkflowDataBlocks kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} setError={setError}/>
          <GithubActionsWorkflowTableOverlay kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} setError={setError}/>
        </div>
      </>
    );
  };

  return (
    <>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        dashboardData={dashboardData}
        index={index}
        setKpis={setKpis}
        showSettingsToggle={showSettingsToggle}
        error={error}
      />
    </>
  );
}

GithubActionsWorkflowChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default GithubActionsWorkflowChart;