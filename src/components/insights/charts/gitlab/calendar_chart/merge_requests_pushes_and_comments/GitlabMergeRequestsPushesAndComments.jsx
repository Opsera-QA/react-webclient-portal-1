import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveCalendar } from "@nivo/calendar";
import config from "./gitlabMergeRequestsPushesAndCommentsConfig";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import { METRIC_CHART_STANDARD_HEIGHT } from "components/common/helpers/metrics/metricTheme.helpers";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import GitlabMergeRequestsPushesAndCommentsActionableOverlay from "./GitlabMergeRequestsPushesAndCommentsActionableOverlay";

function GitlabMergeRequestsPushesAndComments({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
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
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
      dashboardData?.data?.filters[
        dashboardData?.data?.filters.findIndex(
          (obj) => obj.type === "organizations",
        )
      ]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "gitlabTotalCountOfMergeReqAndPushPerDay",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      let dataObject = response?.data
        ? response?.data?.data[0]?.gitlabTotalCountOfMergeReqAndPushPerDay?.data[0]?.data
        : [];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const onChartClick = () => {
    toastContext.showInfoOverlayPanel(
      <GitlabMergeRequestsPushesAndCommentsActionableOverlay metrics={metrics}/>
    );
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
        <ResponsiveCalendar
          data={metrics}
          {...defaultConfig("Date", "", false, false, "", "", true)}
          {...config(new Date())}
          onClick={onChartClick}
          tooltip={({ day, value, color }) => (
            <ChartTooltip
              titles={[day]}
              values={[`${value !== "undefined" ? value : 0} ${value > 1 ? "contributions" : "contribution(s)"}`]}
              style={false}
              color={color}
            />
          )}
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
        header="Merge Requests and Pushes"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

GitlabMergeRequestsPushesAndComments.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GitlabMergeRequestsPushesAndComments;
