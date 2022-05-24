import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "./gitCustodianTopRepositoriesChartConfig";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import { defaultConfig, getColorByData } from '../../../../charts/charts-views';

function GitCustodianTopRepositoriesChart({ dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [totalRepositoriesData, setTotalRepositoriesData] = useState([
    {
      "value": 49,
      "repoId": "17365813",
      "service": "gitlab",
      "id": "HelmCharts",
      "repository": "HelmCharts",
      "lastScannedOn": "2022-05-18T12:24:14.218Z"
    },
    {
      "value": 43,
      "repoId": "18638970",
      "service": "gitlab",
      "id": "terraform",
      "repository": "terraform",
      "lastScannedOn": "2022-05-18T12:17:45.591Z"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
    if (!Array.isArray(totalRepositoriesData) || totalRepositoriesData.length === 0) return null;

    let total = 0;
    totalRepositoriesData.forEach(datum => {
      total += datum.value;
    });

    return (
      <div className="new-chart p-0" style={{ height: "200px", position: "relative" }}>
        <ResponsivePie
          data={totalRepositoriesData}
          {...defaultConfig()}
          {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
        />
        <div style={{ position: "absolute", top: "40%", marginLeft: "52.5%"}}>
          <span>{total}</span>
        </div>
      </div>
    );
  };

  return getChartBody();
}

GitCustodianTopRepositoriesChart.propTypes = {
  dashboardData: PropTypes.object,
  dataWithArc: PropTypes.any,
  centerX: PropTypes.any,
  centerY: PropTypes.any,
};

export default GitCustodianTopRepositoriesChart;
