import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/loading";
import ErrorDialog from "../../../common/error";
import InfoDialog from "../../../common/info";
import BugsCountLineChart from "../../charts/BugsCountLineChart";
import NewBugsCountLineChart from "../../charts/NewBugsCountLineChart";
import ReliabilityRatingLineChart from "../../charts/ReliabilityRatingLineChart";
import ReliabilityRemediationEffortLineChart from "../../charts/ReliabilityRemediationEffortLineChart";

function ReliabilityMetricsView( { persona } ) {
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
    const apiUrl = "/analytics/dashboard/reliability";   
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      let dataObject = res && res.data ? res.data.data[0] : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  };


  console.log("Rendering Reliability Charts");
  console.log(data);

  if(loading) {
    return (<LoadingDialog size="lg" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (data === undefined || Object.keys(data).length == 0 || Object.values(data).every(element => Object.keys(element.data[0]).length === 0)) {
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <BugsCountLineChart data={data} persona={persona} />
          </div>
          <div className="align-self-stretch p-2 w-100">
            <NewBugsCountLineChart data={data} persona={persona} />
          </div>
        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <ReliabilityRatingLineChart data={data} persona={persona} />
          </div>
          <div className="align-self-stretch p-2 w-100">
            <ReliabilityRemediationEffortLineChart data={data} persona={persona} />
          </div>
        </div>

      </>
    );}
}

ReliabilityMetricsView.propTypes = {
  persona: PropTypes.string
};


export default ReliabilityMetricsView;