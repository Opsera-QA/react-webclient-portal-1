import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./gitCustodianTimelineChartConfig";
import React, {useState, useEffect, useContext, useRef} from "react";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import { defaultConfig, getColor, assignStandardColors} from "../../../../charts/charts-views";
import ChartTooltip from "../../../../charts/ChartTooltip";

function GitCustodianTimelineChart({ dashboardData, data }) {
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([
    {
      "_id": [
        "Dummy Second Sprint"
      ],
      "id": "Dummy Second Sprin...",
      "data": [
        {
          "x": "2021-02-10",
          "y": 0
        }
      ],
      "color": "#5B5851"
    },
    {
      "_id": [
        "Dummy Sprint One"
      ],
      "id": "Dummy Sprint One.....",
      "data": [
        {
          "x": "2021-04-15",
          "y": 1
        },
        {
          "x": "2021-02-09",
          "y": 1
        }
      ],
      "color": "#7A756C"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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

  const getBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return (
        <div className="new-chart p-0" style={{height: "200px"}}/>
      );
    }

    return (
      <div className="new-chart p-0" style={{height: "200px"}}>
        <ResponsiveLine
          data={metrics}
          {...defaultConfig("Number of Pending Issues", "Date",
            false, true, "wholeNumbers", "monthDate2")}
          {...config(getColor, METRIC_THEME_CHART_PALETTE_COLORS)}
          tooltip={({ point, color }) => <ChartTooltip
            titles = {["Issues Remaining"]}
            values = {[point.data.y]} />}
        />
      </div>
    );
  };

  return getBody();
}

GitCustodianTimelineChart.propTypes = {
  dashboardData: PropTypes.object,
  data: PropTypes.array
};

export default GitCustodianTimelineChart;
