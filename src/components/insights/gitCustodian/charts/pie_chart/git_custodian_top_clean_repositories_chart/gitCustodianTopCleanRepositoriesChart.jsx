import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "./gitCustodianTopCleanRepositoriesChartConfig";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import { defaultConfig, getColorByData } from '../../../../charts/charts-views';

function GitCustodianTopCleanRepositoriesChart({ dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [totalCleanRepositoriesData, setTotalUncleanRepositoriesData] = useState([
    {
      "totalRepos": 2,
      "value": 1,
      "id": "Clean Repositories"
    },
    {
      "totalRepos": 2,
      "value": 2,
      "id": "Unclean Repositories"
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
    if (!Array.isArray(totalCleanRepositoriesData) || totalCleanRepositoriesData.length === 0) return null;

    let total = 0;
    totalCleanRepositoriesData.forEach(datum => {
      total += datum.value;
    });

    return (
      <div className="new-chart p-0" style={{ height: "200px", position: "relative" }}>
        <ResponsivePie
          data={totalCleanRepositoriesData}
          {...defaultConfig()}
          {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
          onClick={() => setShowModal(true)}
        />
        <div style={{ position: "absolute", top: "40%", marginLeft: "53.5%"}}>
          <span>{total}</span>
        </div>
      </div>
    );
  };

  return getChartBody();
}

GitCustodianTopCleanRepositoriesChart.propTypes = {
  dashboardData: PropTypes.object,
  dataWithArc: PropTypes.any,
  centerX: PropTypes.any,
  centerY: PropTypes.any,
};

export default GitCustodianTopCleanRepositoriesChart;
