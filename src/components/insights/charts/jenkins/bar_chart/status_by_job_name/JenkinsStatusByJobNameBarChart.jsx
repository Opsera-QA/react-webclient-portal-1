import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../api/apiService";
import InfoDialog from "components/common/status_notifications/info";
import config from "./jenkinsStatusByJobNameBarChartConfigs";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";

function JenkinsStatusByJobNameBarChart({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (err.name === "AbortError")
          // console.log("Request was canceled via controller.abort");
          return;
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "jenkinsStatusByJobName",
          metric: "bar",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].jenkinsStatusByJobName : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  };

  if (loading) return <LoadingDialog size="sm" />;
  else if (error) return <ErrorDialog error={error} />;
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<div style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}><ErrorDialog error="No Data is available for this chart at this time." /></div>);
  else
    return (
      <>
        <ModalLogs
          header="Build Status by Job Name"
          size="lg"
          jsonMessage={data ? data.data : []}
          dataType="bar"
          show={showModal}
          setParentVisibility={setShowModal}
        />

        <div className="new-chart mb-3" style={{ height: "300px" }}>
          {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <ResponsiveBar
              data={data ? data.data : []}
              keys={config.keys}
              indexBy="key"
              onClick={() => setShowModal(true)}
              margin={config.margin}
              padding={0.3}
              layout={"horizontal"}
              colors={(bar) => {
                return bar.id === "Failed" ? "red" : "green";
              }}
              borderColor={{ theme: "background" }}
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
              tooltip={({ indexValue, color, value, id }) => (
                <div>
                  <strong style={{ color }}>Build Tag: </strong> {indexValue}
                  <br></br>
                  <strong style={{ color }}> {id} Builds: </strong> {value}
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

JenkinsStatusByJobNameBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string,
};

export default JenkinsStatusByJobNameBarChart;
