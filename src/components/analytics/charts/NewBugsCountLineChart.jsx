// Ticket Number - AN 47 Reliability
// Worked on By - Syed Faseeh Uddin
// Sprint - Analytics Mt. Rainier
// Persona - Developer

import PropTypes from "prop-types";
import { format } from "date-fns";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/status_notifications/error";
import "./charts.css";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";
import { defaultConfig, getColor, assignStandardColors } from "../../insights/charts/charts-views";
import ChartTooltip from "../../insights/charts/ChartTooltip";

function NewBugsCountLineChart({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  }, [date]);

  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "newBugs",
          metric: "line",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].newBugs : [];
      assignStandardColors(dataObject?.data);
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  };

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<ErrorDialog error="No Data is available for this chart at this time." />);
  else
    return (
      <>
        <ModalLogs
          header="New Bugs Count"
          size="lg"
          jsonMessage={data.data}
          dataType="line"
          show={showModal}
          setParentVisibility={setShowModal}
        />

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Sonar: New Bugs Count</div>
          {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <ResponsiveLine
              {...defaultConfig("Number of Bugs", "Date", 
                      false, true, "wholeNumbers", "monthDate2")}
              data={data ? data.data : []}
              xScale={{ type: "point" }}
              yScale={{ 
                type: "linear", 
                min: "auto", 
                max: "auto", 
                stacked: true, 
                reverse: false 
              }}
              colors={getColor}
              onClick={() => setShowModal(true)}
                tooltip={({ point, color }) => <ChartTooltip 
                    titles = {["Timestamp", "New Bugs", "Project Key"]}
                    values = {[format(new Date(point.data.x), "yyyy-MM-dd', 'hh:mm a"),
                              point.data.y, point.data.key]}
                    color = {color} />}
            />
          )}
        </div>
      </>
    );
}
NewBugsCountLineChart.propTypes = {
  persona: PropTypes.string,
};

export default NewBugsCountLineChart;
