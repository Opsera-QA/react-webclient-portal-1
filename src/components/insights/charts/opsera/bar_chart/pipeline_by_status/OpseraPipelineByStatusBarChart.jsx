import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./opseraPipelineByStatusBarChartConfigs";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import chartsActions from "components/insights/charts/charts-actions";
import {getDateObjectFromKpiConfiguration} from "components/insights/charts/charts-helpers";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";

function OpseraPipelineByStatusBarChart({ persona, kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis}) {
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
      const response = await chartsActions.getChart("opseraPipelineByStatus", "bar", date, getAccessToken);
      let dataObject = response?.data?.data[0]?.opseraPipelineByStatus?.data;
      setData(dataObject);
    }
    catch (error) {
      console.error(error);
      setError(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getChartBody = () => {
    if (data == null || data.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{height: "300px"}}>
        <ResponsiveBar
          data={data}
          keys={config.keys}
          indexBy="pipeline_id"
          onClick={() => setShowModal(true)}
          margin={config.margin}
          padding={0.3}
          layout={"horizontal"}
          colors={(bar) => bar.id === "Successful" ? "green" : "red"}
          borderColor={{theme: "background"}}
          colorBy="id"
          defs={config.defs}
          fill={config.fill}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          enableLabel={false}
          borderRadius={0}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(2)"
          animate={true}
          motionStiffness={90}
          borderWidth={2}
          motionDamping={15}
          legends={config.legends}
          tooltip={({indexValue, color, value, id}) => (
            <div>
              <div><strong style={{color}}>Pipeline: </strong> {indexValue}</div>
              <div><strong style={{color}}> {id} Builds: </strong> {value}</div>
            </div>
          )}
          theme={{
            tooltip: {
              container: {
                fontSize: "16px",
              },
            },
          }}
        />
      </div>
    );
  }

  return (
      <div>
        <ChartContainer
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
        {/*TODO: Might make more sense to create KpiChartModal and put inside ChartContainer instead, if it's not too different between charts*/}
        <ModalLogs header="Status by Pipeline" size="lg" jsonMessage={data} dataType="bar" show={showModal} setParentVisibility={setShowModal} />
      </div>
    );
}

OpseraPipelineByStatusBarChart.propTypes = {
  persona: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number
};

export default OpseraPipelineByStatusBarChart;
