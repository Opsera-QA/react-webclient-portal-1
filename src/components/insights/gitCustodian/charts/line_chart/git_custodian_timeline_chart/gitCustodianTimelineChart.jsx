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
  const [metrics, setMetrics] = useState(undefined);
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
        setMetrics([
          {
            "id": "No of Issues added",
            "data": data,
            "color": "#5B5851"
          }
        ]);
      }
    }
  };

  const getBody = () => {
    if (!data || !Array.isArray(data) || data.length === 0
    || !data[0].data || !Array.isArray(data[0].data) || data[0].data.length === 0) {
      return (
        <div className="new-chart p-0" style={{height: "200px"}} >
          <div className={'p-2'}>No data found.</div>
        </div>
      );
    }

    const getMonthDifference = (startDate, endDate) => {
      return (
        endDate.getMonth() -
        startDate.getMonth() +
        12 * (endDate.getFullYear() - startDate.getFullYear())
      );
    };

    const formats = {
      dynamicDateFormat: (d) =>{
        let date = new Date(d).toUTCString();
        date = date.split(" ");

        let length = data[0]?.data?.length;
        let minDate = data[0]?.data[0]?.x;
        let maxDate = data[0]?.data[length-1]?.x;

        let monthDiff  = getMonthDifference(new Date(minDate), new Date(maxDate));

        console.log(monthDiff);

        if(monthDiff < 12){
          return date[2] + " " + date[1];
        }
        return date[2] + " " + date[3];
      }
    };
    

    return (
      <div className="new-chart p-0" style={{height: "200px"}}>
        <ResponsiveLine
          data={data}
          {...defaultConfig("Issues Added", "Date",
            false, true, "wholeNumbers", "monthDate2")}
          {...config(getColor, METRIC_THEME_CHART_PALETTE_COLORS)}
          tooltip={({ point, color }) => <ChartTooltip
            key={point.data.range}
            titles = {["Issues"]}
            values = {[point.data.y]} />}
          axisBottom={{
            format: formats.dynamicDateFormat,
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: "Date",
            legendOffset: 60,
            legendPosition: "middle",
          }}
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
