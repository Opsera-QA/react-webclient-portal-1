import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import InfoDialog from "../../common/status_notifications/info";
// import config from "./opseraBuildsByUserBarChartConfigs";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import { defaultConfig, getColor, assignStandardColors,
         adjustBarWidth, capitalizeLegend } from '../../insights/charts/charts-views';
import ChartTooltip from '../../insights/charts/ChartTooltip';
function OpseraBuildsByUserBarChart({ persona, date }) {
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
          request: "opseraPipelinesByUser",
          metric: "bar",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res?.data?.data[0] ? res.data.data[0].opseraPipelinesByUser : [];
      assignStandardColors(dataObject?.data, true);
      capitalizeLegend(dataObject?.data, ["value"]);
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
          header="Builds By User"
          size="lg"
          jsonMessage={data ? data.data : []}
          dataType="bar"
          show={showModal}
          setParentVisibility={setShowModal}
        />

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Opsera: Builds by User</div>
          {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <ResponsiveBar
              {...defaultConfig('Users', 'Number of Builds', 
                    true, false, 'cutoffString', 'wholeNumbers')}
              {...adjustBarWidth(data ? data.data : [], false)}
              data={data ? data.data : []}
              keys={["Value"]}
              indexBy="key"
              onClick={() => setShowModal(true)}
              padding={0.3}
              layout={"horizontal"}
              colorBy="id"
              colors={d => getColor(d.data)}
              tooltip={({ indexValue, value, color }) => <ChartTooltip 
                                            titles = {["User", "Number of Builds"]}
                                            values={[indexValue, value]}
                                            color = {color}
                                            style = {false} />}
            />
          )}
        </div>
      </>
    );
}

OpseraBuildsByUserBarChart.propTypes = {
  date: PropTypes.object,
  persona: PropTypes.string,
};

export default OpseraBuildsByUserBarChart;
