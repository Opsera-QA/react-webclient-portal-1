import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/loading";
import ErrorDialog from "../../../common/error";
import InfoDialog from "../../../common/info";
import BugsCountLineChart from "../../charts/BugsCountLineChart";
import NewBugsCountLineChart from "../../charts/NewBugsCountLineChart";
import ReliabilityRatingLineChart from "../../charts/ReliabilityRatingLineChart";
import ReliabilityRemediationEffortLineChart from "../../charts/ReliabilityRemediationEffortLineChart";

function ReliabilityMetricsCharts( { persona } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/dashboard/reliability", {}, accessToken);
    
    apiCall.get()
      .then(res => {
        let dataObject = res && res.data ? res.data.data[0] : [];
        setData(dataObject);
        setLoading(false);
      })
      .catch(err => {
        setErrors(err);
        setLoading(false);
      });
  };

  useEffect( () => {
    getApiData();
  }, []);

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
          <div className="p-2 flex-grow-1">
            <div className="chart mb-3" style={{ height: "300px" }}>
              {/* bugs chart */}
              <BugsCountLineChart data={data} persona={persona} />
            </div>
            <div className="chart mb-3" style={{ height: "300px" }}>
              {/* new bugs chart */}
              <NewBugsCountLineChart data={data} persona={persona} />
            </div>
            <div className="chart mb-3" style={{ height: "300px" }}>
              {/* reliability_rating */}
              <ReliabilityRatingLineChart data={data} persona={persona} />
            </div>
            <div className="chart mb-3" style={{ height: "300px" }}>
              {/* reliability_remediation_effort */}
              <ReliabilityRemediationEffortLineChart data={data} persona={persona} />

            </div>
          </div> 
        </div>
      </>
    );}
}

ReliabilityMetricsCharts.propTypes = {
  persona: PropTypes.string
};


export default ReliabilityMetricsCharts;