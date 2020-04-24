import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import InfoDialog from "../../common/info";
import SonarLinesToCoverBarChart from "../charts/sonarLinesToCoverBarChart";
import SonarCodeCoverageBarChart from "../charts/sonarCodeCoverageBarChart";

function CodeCoverageMetricsView( { persona } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
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


  const fetchData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      data: [
        { 
          request: "sonarCodeCoverage",
          metric: "bar" 
        }
      ]
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].sonarCodeCoverage : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  };


  console.log("Rendering Code Coverage Charts");
  console.log(data);

  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (typeof data !== "object" || Object.keys(data).length == 0 || data.status !== 200) {
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>
        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <SonarLinesToCoverBarChart data={data} persona={persona} />
          </div>
          <div className="align-self-stretch p-2 w-100">
            <SonarCodeCoverageBarChart data={data} persona={persona} />
          </div>
        </div>
      </>
    );}
}

CodeCoverageMetricsView.propTypes = {
  persona: PropTypes.string
};


export default CodeCoverageMetricsView;