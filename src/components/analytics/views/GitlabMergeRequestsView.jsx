import PropTypes from "prop-types";
import ErrorDialog from "../../common/status_notifications/error";
import "../charts/charts.css";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import GitlabMergeRequestTimeTakenBarChart from "../charts/GitlabMergeRequestTimeTakenBarChart";

function GitlabMergeRequestsView({ persona }) {
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
  }, []);

  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "gitlabTimeTakeFromMergeCreationToComplete",
          metric: "bar",
        },
      ],
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].gitlabTimeTakeFromMergeCreationToComplete.data : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  };

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  else
    return (
      <>
        {data &&
          data.length > 0 &&
          data.map((item, key) => {
            return (
              <>
                <GitlabMergeRequestTimeTakenBarChart key={key} persona={persona} data={item} />
              </>
            );
          })}
      </>
    );
}

GitlabMergeRequestsView.propTypes = {
  persona: PropTypes.string,
};

export default GitlabMergeRequestsView;
