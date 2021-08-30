import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import InfoDialog from "../../common/status_notifications/info";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import { defaultConfig, mainColor, failColor, mainPurple, warningColor,
         adjustBarWidth } from "../../insights/charts/charts-views";
import ChartTooltip from "../../insights/charts/ChartTooltip";

function JenkinsStatusByJobNameBarChar({ persona, date }) {
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

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Jenkins: Build Status by Job Name</div>
          {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <ResponsiveBar
              {...defaultConfig("Build Tag", "Number of Builds", 
                      true, false, "cutoffString", "wholeNumbers")}
              {...adjustBarWidth(data ? data.data : [], false)}
              data={data ? data.data : []}
              keys={["Successful", "Failed", "Aborted", "Unstable"]}
              indexBy="key"
              colorBy="id"
              layout="horizontal"
              colors={(bar) => {
                switch (bar.id) {
                  case "Successful": return mainColor;
                  case "Failed": return failColor;
                  case "Aborted": return mainPurple;
                  default: return warningColor;
                }
              }}
              onClick={() => setShowModal(true)}
              tooltip={({ indexValue, color, value, id }) => <ChartTooltip 
                              titles = {["Build Tag", `${id} Builds`]}
                              values = {[indexValue, value]}
                              style = {false}
                              color = {color} />}
            />
          )}
        </div>
      </>
    );
}

JenkinsStatusByJobNameBarChar.propTypes = {
  date: PropTypes.object,
  persona: PropTypes.string,
};

export default JenkinsStatusByJobNameBarChar;
