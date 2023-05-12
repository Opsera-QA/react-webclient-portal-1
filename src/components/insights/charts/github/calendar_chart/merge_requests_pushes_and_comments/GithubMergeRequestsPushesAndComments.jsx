import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveCalendar } from "@nivo/calendar";
import config from "./githubMergeRequestsPushesAndCommentsConfig";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig, gradationalColors } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import GithubMergeRequestsPushesCommentsActionableOverlay
  from "./actionable_insights/GithubMergeRequestsPushedCommentsActionableOverlay";
function GithubMergeRequestsPushesAndComments({
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
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubTotalCountOfMergeReqAndPushPerDay",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      let dataObject = response?.data
        ? response?.data?.data[0]?.githubTotalCountOfMergeReqAndPushPerDay?.data[0]?.data
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

  const onRowSelect = (node) => {
    if(node?.value) {
      toastContext.showOverlayPanel(
          <GithubMergeRequestsPushesCommentsActionableOverlay
              kpiConfiguration={kpiConfiguration}
              dashboardData={dashboardData}
              date={node?.day.toString()}
          />,
      );
    }
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{ height: "300px" }}>
        <ResponsiveCalendar
          data={metrics}
          {...defaultConfig("", "", false, false, "", "", true)}
          {...config(gradationalColors, new Date())}
          onClick={(node) => onRowSelect(node)}
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

GithubMergeRequestsPushesAndComments.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GithubMergeRequestsPushesAndComments;
