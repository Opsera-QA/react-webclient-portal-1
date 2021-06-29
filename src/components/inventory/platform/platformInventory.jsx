import React, { useState, useEffect, useContext } from "react";
import { Alert } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import ErrorDialog from "components/common/status_notifications/error";
import DropdownList from "react-widgets/lib/DropdownList";
import PlatformToolsTable from "./platformToolsTable.jsx";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ToolRegistryHelpDocumentation
  from "components/common/help/documentation/tool_registry/ToolRegistryHelpDocumentation";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faFileCode, faHandshake, faServer, faTools} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";

// TODO: Refactor
function PlatformInventory ({ handleTabClick }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
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
    setIsLoading(true);
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
      setIsLoading(false);
    }
    catch (err) {
      setErrors(err);
      setIsLoading(false);
    }
  };

  const handleDropdownChange = (selectedOption) => {
    console.log(selectedOption);
    setKey(selectedOption);
  };

  const getBody = () => {
    if (error) {
      return (<ErrorDialog error={error} />);
    }

    if (isLoading) {
      return (<LoadingDialog message={"Loading Platform Applications"} size={"sm"} />);
    }


    return (
      <div className="h-50 p-2">
        {!isLoading && data && data.length === 0 ?
          <>
            <div className="mt-3">
              <Alert variant="secondary">
                No applications are currently configured for the system.
              </Alert>
            </div>
          </>:

          <div className="custom-table-filter d-flex my-1 ml-2 mr-1">
            <span className="formLabel mt-1">Application: </span>
            {renderForm ?
              <DropdownList
                className="application-select"
                data={data}
                valueField='name'
                busy={isLoading}
                textField='name'
                onChange={handleDropdownChange}
              /> : null }
          </div>
        }

        <div>
          {key && Object.keys(key).length > 0 ?
            <>
              {Object.keys(key.tools).length > 0
                ? <PlatformToolsTable data={key.tools} isLoading={isLoading} />
                : <div className="mt-2"><Alert variant="secondary">No tools are currently configured for this application.</Alert></div> }
            </>
            : null }
        </div>
      </div>
    );
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faTools} tabName={"tools"} handleTabClick={handleTabClick} activeTab={"platform"} tabText={"Tools"} />
        <NavigationTab icon={faServer} tabName={"platform"} handleTabClick={handleTabClick} activeTab={"platform"} tabText={"Platform"} />
        <NavigationTab icon={faHandshake} tabName={"parameters"} handleTabClick={handleTabClick} activeTab={"platform"} tabText={"Parameters"} />
        <NavigationTab icon={faFileCode} tabName={"scripts"} handleTabClick={handleTabClick} activeTab={"platform"} tabText={"Scripts"} />
      </NavigationTabContainer>
    );
  };


  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"platform"}
    >
      {getBody()}
    </ScreenContainer>
  );
}

PlatformInventory.propTypes = {
  handleTabClick: PropTypes.func
};

export default PlatformInventory;
