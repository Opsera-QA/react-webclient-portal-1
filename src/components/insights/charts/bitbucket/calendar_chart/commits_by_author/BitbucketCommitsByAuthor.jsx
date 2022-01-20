import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import config from "./bitbucketCommitsByAuthorConfig";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig, gradationalColors, newChartColors } from '../../../charts-views';

function BitbucketCommitsByAuthor({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) cancelTokenSource.cancel();

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) throw error;
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "bitbucketTotalCommitsByUserAndDate",
        kpiConfiguration,
        dashboardTags
      );
      let dataObject = response?.data?.data[0]?.bitbucketTotalCommitsByUserAndDate?.data;

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let usersList = dataObject && dataObject.length > 0 ? Object.keys(dataObject[0]) : [];

        if (usersList) {
          usersList = usersList.filter((value) => value !== "date");
          setUsers(usersList);
        }
      }

    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) setIsLoading(false);
    }
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) return null;

    return (
      <div className="new-chart mb-3" style={{ height: "300px" }}>
        <ResponsiveHeatMap
          data={metrics}
          {...defaultConfig("Date", "", true, true, "yearMonthDate", "cutoffString")}
          {...config(users, gradationalColors, newChartColors)}
          onClick={() => setShowModal(true)}
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
        header="Commits by Authors"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

BitbucketCommitsByAuthor.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default BitbucketCommitsByAuthor;
