import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import ConfigurationsForm from "./configurationsForm";
import { Alert } from "react-bootstrap";
import SearchLogs from "../analytics/logs/searchLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./analytics.css";
import "./charts/charts.css";


function Analytics() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    setToken(accessToken);

    const apiCall = new ApiService("/analytics/settings", {}, accessToken);
    apiCall.get()
      .then(function (result) {
        console.log(result.data);
        setData(result.data);
        setLoading(false);        
      })
      .catch(function (error) {
        setLoading(false);
        setErrors(error);
        console.log(`Error Reported: ${error}`);
      });
  }

  return (
    <div className="mt-3">
      {!loading &&
      <>
        <div className="max-content-width">
          <h4>Analytics and Logs</h4>
          <p>OpsERA provides users with access to a vast repository of logging and analytics.  Access all available 
         logging, reports and configurations around the OpsERA Analytics Platform or search your 
        currently configured logs repositories below.</p>
        </div>
        {(typeof data.profile === "object" && data.profile.length === 0 ) ? 
          <div className="p-2 mt-1 max-content-width">
            {error && <ErrorDialog error={error} />}
            <ConfigurationsForm settings={data} token={token} />
          </div>
          :
          data.esSearchApi !== null ?
            <>
              <div className="pr-2 mt-1 text-right max-content-width">
                <Link to='/profile'><FontAwesomeIcon icon={faCog} fixedWidth size="lg" /></Link>
              </div> 

              <div>
                <SearchLogs className="pr-2 mt-1" />
              </div>
            
            </>
            :
            <div style={{ height: "200px" }}>
              <div className="row h-100">
                <div className="col-sm-12 my-auto text-center">
                  <Alert variant="info">
                    An OpsERA Analytics instance must be spun up and configured with your pipeline tools in order to leverage these features.
                  </Alert>
                </div>
              </div>
            </div>          
        }
      
      </>}
    </div>
  );
}

Analytics.propTypes = {
  tools: PropTypes.object
};

export default Analytics;
