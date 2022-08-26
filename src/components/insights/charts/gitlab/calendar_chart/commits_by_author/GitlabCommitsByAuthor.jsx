import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import config from "./gitlabCommitsByAuthorConfig";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig } from '../../../charts-views';
import { METRIC_CHART_STANDARD_HEIGHT } from "components/common/helpers/metrics/metricTheme.helpers";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import GitlabCommitsByAuthorActionableOverlay from "./GitlabCommitsByAuthorActionableOverlay";

function GitlabCommitsByAuthor({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [users, setUsers] = useState([]);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "gitlabTotalCommitsByUserAndDate", kpiConfiguration, dashboardTags);
      let dataObject = response?.data ? response?.data?.data[0]?.gitlabTotalCommitsByUserAndDate?.data : [];
      var usersList = dataObject && dataObject.length > 0 ? Object.keys(dataObject[0]) : [];
      usersList = usersList.filter((value) => value != "date");
      setUsers(usersList);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const onChartClick = () => {
    toastContext.showInfoOverlayPanel(
      <GitlabCommitsByAuthorActionableOverlay metrics={metrics} />
    );
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }
  return (
    <div className="new-chart mb-3" style={{height: METRIC_CHART_STANDARD_HEIGHT}}>
          <ResponsiveHeatMap
            data={metrics}
            {...defaultConfig("Date", "", true, true, "yearMonthDate", "cutoffString")}
            {...config(users)}
            onClick={onChartClick}
          />
      </div>
  );
  };

  return (
    <div>
      <ChartContainer
        title={kpiConfiguration?.kpi_name}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
      />
      <ModalLogs
        header="Commits By Author"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

GitlabCommitsByAuthor.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default GitlabCommitsByAuthor;
