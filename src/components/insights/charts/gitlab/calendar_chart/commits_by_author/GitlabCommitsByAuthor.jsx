import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import config from "./gitlabCommitsByAuthorConfig";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
function GitlabCommitsByAuthor({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [users, setUsers] = useState([]);

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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "gitlabTotalCommitsByUserAndDate", kpiConfiguration, dashboardTags);
      let dataObject = response?.data ? response?.data?.data[0]?.gitlabTotalCommitsByUserAndDate?.data : [];
      var usersList = dataObject && dataObject.length > 0 ? Object.keys(dataObject[0]) : [];
      usersList = usersList.filter((value) => value != "date");
      setUsers(usersList);

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
          <ResponsiveHeatMap
            data={metrics}
            keys={users}
            indexBy="date"
            onClick={() => setShowModal(true)}
            margin={{ top: 10, right: 40, bottom: 40, left: 40 }}
            forceSquare={true}
            // axisTop={{ orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: -90, legend: '', legendOffset: 36 }}
            axisRight={null}
            // axisBottom={null}
            axisTop={null}
            axisBottom={config.axisBottom}
            axisLeft={config.axisLeft}
            // sizeVariation={0.4}
            // padding={1}
            cellOpacity={1}
            cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
            labelTextColor="#fdeded"
            colors={["#9FC8E5", "#7fa8ca", "#537aa2", "#3F6891"]}
            cellShape={"circle"}
            enableLabels={true}
            defs={config.defs}
            fill={config.fill}
            animate={true}
            motionStiffness={80}
            motionDamping={9}
            hoverTarget="cell"
            cellHoverOthersOpacity={0.25}
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
        header="Commits By Author"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

GitlabCommitsByAuthor.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default GitlabCommitsByAuthor;
