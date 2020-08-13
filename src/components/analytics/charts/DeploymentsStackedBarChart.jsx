// Ticket Number - AN 45 Change Failure Rate
// Worked on By - Syed Faseeh Uddin
// Sprint - Analytics Mt. Rainier
// Persona - Developer/Manager/Executive

import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./DeploymentsStackedBarChartConfigs";
import "./charts.css";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import InfoDialog from "../../common/info";
import ModalLogs from "../../common/modal/modalLogs";

function DeploymentsStackedBarChart({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getApiData = useCallback(async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "successfulDeploymentFrequency",
          metric: "stackedBar",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].successfulDeploymentFrequency : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      // console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }, [contextType, date]);

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await getApiData();
      } catch (err) {
        if (err.name === "AbortError") {
          // console.log("Request was canceled via controller.abort");
          return;
        }
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, [getApiData, date]);

  if (loading) {
    return <LoadingDialog size="sm" />;
  } else if (error) {
    return <ErrorDialog error={error} />;
    // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
    //   return (<ErrorDialog error="No Data is available for this chart at this time." />);
  } else {
    // console.log(data.data);
    return (
      <>
        <ModalLogs
          header="Deployments Graph"
          size="lg"
          jsonMessage={data.data}
          dataType="bar"
          show={showModal}
          setParentVisibility={setShowModal}
        />
        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Jenkins: Deployments Graph</div>
          {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 || data.length === 0 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <ResponsiveBar
              data={data ? data.data : []}
              onClick={() => setShowModal(true)}
              keys={config.keys}
              indexBy="buildTime"
              margin={{ top: 40, right: 110, bottom: 70, left: 100 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
              axisTop={null}
              axisRight={null}
              enableLabel={false}
              axisBottom={config.axisBottom}
              axisLeft={config.axisLeft}
              pointSize={10}
              pointBorderWidth={8}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              lineWidth={3.5}
              legends={config.legends}
              padding={0.3}
              // layout={"horizontal"}
              colors={({ id, data }) => data[`${id}_color`]}
              borderColor={{ theme: "background" }}
              colorBy="id"
              defs={config.defs}
              fill={config.fill}
              tooltip={({ indexValue, color, value, id, data }) => (
                <div>
                  <strong style={{ color }}>Build Time: </strong> {indexValue}
                  <br></br>
                  <strong style={{ color }}> {id} Builds: </strong> {value}
                  <br></br>
                  <strong> Failure Rate: </strong> {data.failureRate.toFixed(2) + "%"}
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
          )}
        </div>
      </>
    );
  }
}

DeploymentsStackedBarChart.propTypes = {
  persona: PropTypes.string,
};

export default DeploymentsStackedBarChart;
