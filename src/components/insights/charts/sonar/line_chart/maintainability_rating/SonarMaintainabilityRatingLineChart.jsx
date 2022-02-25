import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "components/insights/charts/sonar/line_chart/maintainability_rating/sonarMaintainabilityRatingLineChartConfigs";
import React, {useState, useEffect, useContext, useRef} from "react";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { format } from "date-fns";
import { defaultConfig, getColor, assignStandardColors } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";

function SonarMaintainabilityRatingLineChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
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
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "sonarMaintainability", kpiConfiguration, dashboardTags);
      const dataObject = response?.data && response?.data?.data[0]?.sonarMaintainability.status === 200 ? response?.data?.data[0]?.sonarMaintainability?.data : [];
      assignStandardColors(dataObject, true);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
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

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{height: "300px"}}>
          <ResponsiveLine
            data={metrics}
            {...defaultConfig("Average Quality Gate Value", "Date", 
                      false, true, "wholeNumbers", "yearMonthDate")}
            {...config(getColor)}
            onClick={() => setShowModal(true)}
            tooltip={({ point, color }) => <ChartTooltip 
                titles = {["Timestamp", "Maintainability Rating", "Key"]}
                values = {[format(new Date(point.data.x), "yyyy-MM-dd', 'hh:mm a"),
                           point.data.y === 1 && "A" || 
                           point.data.y === 2 && "B" ||
                           point.data.y === 3 && "C" ||
                           point.data.y === 4 && "D" ||
                           point.data.y === 5 && "E",
                           point.data.key]}
                color = {color} />}
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
        header="Maintainability Rating"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

SonarMaintainabilityRatingLineChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default SonarMaintainabilityRatingLineChart;
