import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "./gitCustodianTopRepositoriesChartConfig";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import { defaultConfig, getColorByData } from '../../../../charts/charts-views';

function GitCustodianTopRepositoriesChart({ dashboardData, data }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
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
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <div className="new-chart p-0" style={{height: "200px"}} >
          <div className={'p-2'}>No data found.</div>
        </div>
      );
    }

    let total = 0;
    data.forEach(datum => {
      total += datum.value;
    });

    return (
      <div className="new-chart p-0" style={{ height: "200px", position: "relative" }}>
        <ResponsivePie
          data={data}
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
  data: PropTypes.array
};

export default GitCustodianTopRepositoriesChart;
