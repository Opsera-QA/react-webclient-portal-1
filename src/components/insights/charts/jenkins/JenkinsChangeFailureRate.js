// Ticket Number - AN 45 Change Failure Rate
// Worked on By - Syed Faseeh Uddin
// Sprint - Analytics Mt. Rainier
// Persona - Developer/Manager/Executive

import PropTypes from "prop-types";
import ErrorDialog from "components/common/status_notifications/error";
import "components/analytics/charts/charts.css";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import { mainColor, failColor } from "../charts-views";

function JenkinsChangeFailureRate({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await getApiData();
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
  }, [date]);

  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "jenkinsDeploySuccess",
          metric: "guage",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].jenkinsDeploySuccess : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  };

  if (loading) return <LoadingDialog size="sm" />;
  else if (error) return <ErrorDialog error={error} />;
  else
    return (
      <>
        <div className="new-chart mb-3" style={{ height: "300px" }}>
          {typeof data.data !== "object" ||
          Object.keys(data.data).length == 0 ||
          data.status !== 200 ||
          data.data.length == 0 ||
          typeof data.data[0].failureRate !== "number" ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <div
              className="circle"
              style={{ backgroundColor: data.data && data.data[0].failureRate > 50 ? failColor : mainColor }}
            >
              {data.data && data.data[0].failureRate.toFixed(2) + "%"}
            </div>
          )}
        </div>
      </>
    );
}

JenkinsChangeFailureRate.propTypes = {
  persona: PropTypes.string,
};

export default JenkinsChangeFailureRate;
