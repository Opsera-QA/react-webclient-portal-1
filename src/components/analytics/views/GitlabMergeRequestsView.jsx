import PropTypes from "prop-types";
import ErrorDialog from "../../common/error";
import "../charts/charts.css";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import GitlabMergeRequestTimeTakenBarChart from "../charts/GitlabMergeRequestTimeTakenBarChart";


function GitlabMergeRequestsView( { persona } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        console.log("FETCHING DATA");
        await getApiData();
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
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
          metric: "bar"
        }
      ]
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].gitlabTimeTakeFromMergeCreationToComplete.data : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  };

  // console.log(data);

  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else {
    return (
      <>
        {data && data.length>0 && data.map((item, key) => {
          return (
            <> 
              <GitlabMergeRequestTimeTakenBarChart key={key} persona={persona} data={item}/>
            </>
          );
        })}
        
      </>
    );
  }
}

GitlabMergeRequestsView.propTypes = {
  persona: PropTypes.string
};

export default GitlabMergeRequestsView;
