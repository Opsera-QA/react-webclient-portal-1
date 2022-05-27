import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./gitCustodianTopAuthorsChartConfig";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { defaultConfig, getColorByData, adjustBarWidth} from "../../../../charts/charts-views";
import {METRIC_THEME_CHART_PALETTE_COLORS} from "../../../../../common/helpers/metrics/metricTheme.helpers";

function GitCustodianTopAuthorsChart({ dashboardData, data }) {
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

  const getBody = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <div className="new-chart p-0" style={{height: "200px"}} >
          <div className={'p-2'}>No data found.</div>
        </div>
      );
    }

    return (
      <div className="new-chart p-0" style={{ height: "200px" }}>
        <ResponsiveBar
          data={data}
          {...defaultConfig("Author", "Count",
            true, false, "cutoffString", "values", true)}
          {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
          {...adjustBarWidth(data, false)}
        />
      </div>
    );
  };

  return getBody();
}

GitCustodianTopAuthorsChart.propTypes = {
  dashboardData: PropTypes.object,
  data: PropTypes.array
};

export default GitCustodianTopAuthorsChart;
