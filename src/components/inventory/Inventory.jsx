import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Alert, Table } from "react-bootstrap";
import { format } from "date-fns";
import { AuthContext } from "../../contexts/AuthContext";  
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
//import LoadingDialog from "../common/loading";
import DropdownList from "react-widgets/lib/DropdownList";
import ToolRegistry from "../tools/toolRegistry";

function Inventory () {
  const { view } = useParams();
  const contextType = useContext(AuthContext);
  const [selection, setSelection] = useState("");
  const [previewRole, setPreviewRole] = useState(false);
  
  useEffect(()=> {
    getRoles();
    if (view === "tools") {
      setSelection("tools");
    } else {
      setSelection("platform");
    }  
  }, []);
  
  const getRoles = async () => {
    const { getIsPreviewRole } = contextType; 
    //this returns true IF the Okta groups for user contains "Preview".  Please wrap display components in this.
    const isPreviewRole = await getIsPreviewRole(true);
    setPreviewRole(isPreviewRole);
    if (isPreviewRole) {
      console.log("Enabling Preview Feature Toggle. ", isPreviewRole);
    }    
  };

  const handleTabClick = param => e => {
    e.preventDefault();
    setSelection(param);    
  };

  return (
    <div className="mt-3 max-content-width">
      <h4>{selection === "tools" ? "Tool Registry" : "Inventory"}</h4>
      <p>The OpsERA Tool Registry allows you to register, track and configure all of the tools in your organization in one centralized inventory.</p>

      <ul className="nav nav-pills mt-2">
        <li className="nav-item">
          <a className={"nav-link " + (selection === "platform" ? "active" : "")} href="#" onClick={handleTabClick("platform")}>Platform</a>
        </li>
        <li className="nav-item">
          <a className={"nav-link " + (selection === "tools" ? "active" : "") + (!previewRole ? "disabled" : "")} href="#" onClick={handleTabClick("tools")}>Tools</a>
        </li>
      </ul>
      
      {selection === "platform" ? <PlatformInventory /> : null }
      {selection === "tools" ? <ToolRegistry /> : null } 
    </div >
  );  
}


const PlatformInventory = () => {
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
    const { getAccessToken, getUserInfo } = contextType;
    const accessToken = await getAccessToken();
    const userInfo = await getUserInfo();
    const params = { userid: userInfo.sub };
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

          <div className="mt-1 max-content-module-width-50">
            <Form>
              <Form.Group>

                <Form.Label>Select Application</Form.Label>
                {renderForm ?
                  <DropdownList
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
                <App application={key} /> : 
                <div className="max-content-module-width-50"><Alert variant="secondary">No tools are currently configured for this application.</Alert></div> }
            </>
            : null }
        </div>
      </div>
    );
  }
};


const App = ({ application }) => {
  const { tools } = application;
  console.log(application);
  return (
    <Table striped bordered hover className="table-sm" style={{ fontSize:"small" }}>
      <thead>
        <tr>
          <th style={{ width: "15%" }}>Tool</th>
          <th className="text-center" style={{ width: "5%" }}>Port</th>
          <th className="text-center" style={{ width: "5%" }}>Version</th>                
          <th className="text-center" style={{ width: "10%" }}>Status</th>
          <th className="text-center" style={{ width: "10%" }}>Install Date</th>
          <th style={{ width: "30%" }}>URL</th>
          <th style={{ width: "25%" }}>DNS</th>
        </tr>
      </thead>
      <tbody>
        {tools && tools.map((item, idx) => (
          <tr key={idx} >
            <td>{item["name"]}<br /><span className="text-muted small">{item["id"]}</span></td>
            <td className="text-center">{item["port"]}</td>
            <td className="text-center">{item["versionNumber"]}</td>
            <td className="text-center">{item["toolStatus"]}</td>
            <td className="text-center">{format(new Date(item["installationDate"]), "yyyy-MM-dd")}</td>   
            <td>{item["toolURL"]}</td>
            <td>{item["dnsName"]}</td>
          </tr>
        ))}
      </tbody>
    </Table>

  );
};


App.propTypes = {
  application: PropTypes.object
};


export default Inventory;
