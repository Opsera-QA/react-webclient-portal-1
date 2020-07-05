import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Alert, Table } from "react-bootstrap";
import { format } from "date-fns";
import { AuthContext } from "contexts/AuthContext";  
import { axiosApiService } from "api/apiService";
import ErrorDialog from "components/common/error";
//import LoadingDialog from "../common/loading";
import DropdownList from "react-widgets/lib/DropdownList";
import PlatformToolsTable from "./platformToolsTable.jsx";

function PlatformInventory () {

  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [key, setKey] = useState({});
  const [renderForm, setRenderForm] = useState(false);

  useEffect(()=> {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        getApiData();
        setRenderForm(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();
    return () => {
      setRenderForm(false);     
      controller.abort();      
    };
  }, []);

  const getApiData = async () => {
    setLoading(true);
    setKey(null);
    const { getAccessToken, getUserRecord } = contextType;
    const accessToken = await getAccessToken();
    const userInfo = await getUserRecord();
    const params = { userid: userInfo.userId };
    const apiUrl = "/applications";
    
    try {
      const result = await axiosApiService(accessToken).get(apiUrl, { params });    
      const filteredApps = result.data.filter((app) => { return app.type !== "pipeline"; }); //we don't want the legacy pipeline apps to show.
      setData(filteredApps);
      setLoading(false);
    }
    catch (err) {
      setErrors(err);
      setLoading(false);
    }
  };

  const handleDropdownChange = (selectedOption) => {
    console.log(selectedOption);
    setKey(selectedOption);
  };

  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <div className="mt-3">
        {!loading && data && data.length === 0 ? 
          <>
            <div className="mt-3 max-content-module-width-50">
              <Alert variant="secondary">
                No applications are currently configured for the system.
              </Alert>
            </div>
          </>:

          <div className="mt-1">
            <Form>
              <Form.Group className="flex">
                <Form.Label className="mr-3 mt-1 formLabel">Select Application</Form.Label>
                {renderForm ?
                  <DropdownList
                    className="application-select"
                    data={data} 
                    valueField='name'
                    busy={loading} 
                    textField='name'
                    onChange={handleDropdownChange}             
                  /> : null }
              </Form.Group>
            </Form>
          </div> }
        
        <div className="mt-3">
          {key && Object.keys(key).length > 0 ? 
            <>
              {Object.keys(key.tools).length > 0 ? 
                <PlatformToolsTable data={key.tools}></PlatformToolsTable>
                : 
                <div className="max-content-module-width-50"><Alert variant="secondary">No tools are currently configured for this application.</Alert></div> }
            </>
            : null }
        </div>
      </div>
    );
  }
}

export default PlatformInventory;
