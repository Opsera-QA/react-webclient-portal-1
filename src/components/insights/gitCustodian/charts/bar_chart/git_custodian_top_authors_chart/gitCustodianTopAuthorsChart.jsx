import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./gitCustodianTopAuthorsChartConfig";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { defaultConfig, getColorByData, adjustBarWidth} from "../../../../charts/charts-views";
import {METRIC_THEME_CHART_PALETTE_COLORS} from "../../../../../common/helpers/metrics/metricTheme.helpers";

function GitCustodianTopAuthorsChart({ dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [topAuthorsData, setTopAuthorsData] = useState([
    {
      "_id": "DIlnawaz Ragib",
      "count": 48
    },
    {
      "_id": "Vignesh Kumar Subramanian",
      "count": 44
    },
    {
      "_id": "DIlnawaz Ragib1",
      "count": 48
    },
    {
      "_id": "Vignesh Kumar Subramanian1",
      "count": 44
    },
    {
      "_id": "DIlnawaz Ragib2",
      "count": 48
    },
    {
      "_id": "Vignesh Kumar Subramanian2",
      "count": 44
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

  const getBody = () => {
    if (!Array.isArray(topAuthorsData) || topAuthorsData.length === 0) {
      return null;
    }

    return (
      <div className="new-chart p-0" style={{ height: "200px" }}>
        <ResponsiveBar
          data={topAuthorsData}
          {...defaultConfig("Author", "Count",
            true, false, "cutoffString", "values", true)}
          {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
          {...adjustBarWidth(topAuthorsData, false)}
        />
      </div>
    );
  };

  return getBody();
}

GitCustodianTopAuthorsChart.propTypes = {
  dashboardData: PropTypes.object
};

export default GitCustodianTopAuthorsChart;
