import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { Alert } from "react-bootstrap";
import SearchLogs from "./searchLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./logs.css";


function Logs() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [tools, setTools] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [token, setToken] = useState();
  

  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        console.log("FETCHING DATA");
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


  async function fetchData() {
    setLoadingProfile(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/settings";   
    setToken(accessToken);
    try {
      const profile = await axiosApiService(accessToken).get(apiUrl);
      const tools = await axiosApiService(accessToken).post("/analytics/data", {
        "data": [
          { 
            "request": "listOfTools",
            "metric": "tools" 
          }
        ]
      });
      const dataPresent = tools ? tools.data : false;
      const secondaryCheck = tools.data.data ? tools.data.data : false;
      const listOfTools = (dataPresent && secondaryCheck) ? (tools.data.data[0].listOfTools) ? tools.data.data[0].listOfTools.data : [] : [];
      console.log(listOfTools);      
      console.log("Profile: ", profile);
      setData(profile && profile.data.profile[0]);
      setTools(listOfTools);
      console.log(profile && profile.data.profile[0]);

      if (typeof(data.profile) === "object" && data.profile.length === 0) {
        setErrors("Warning!  Profile settings associated with your account are incomplete.  Log searching will be unavailable until this is fixed.");
      }

      setLoadingProfile(false);
    }
    catch (err) {
      console.log(err.message);
      setLoadingProfile(false);
      setErrors(err.message);
    }
  }


  return (
    <>
      {loadingProfile ? <LoadingDialog size="lg" /> : null }
      {error ? <ErrorDialog error={error} /> : null}
    
      <div className="max-content-width">
        <h4>Logs</h4>
        <p>OpsERA provides users with access to a vast repository of logging with industry leading search and filtering capability.  Access all available 
         logging, reports and configurations around the OpsERA Analytics Platform or search your 
        currently configured logs repositories below. </p>
      </div>
        
      <div className="pr-2 mt-1">
        <SearchLogs tools={tools} />
      </div>
            
    </> 
  );
}


export default Logs;
