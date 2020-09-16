import { axiosApiService } from "api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import "./tools.css";
import ToolsTable from "./ToolsTable";
import {createFilterOptionList} from "../../../utils/tableHelpers";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import {getLoadingErrorDialog} from "../../common/toasts/toasts";

// TODO: Rename ToolManagement?, implement DialogToastContext
function ToolInventory () {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [toolRegistryList, setToolRegistryList] = useState([]);
  const [filterOptionList, setFilterOptionList] = useState([]);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {    
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await getToolList();
    await getToolRegistryList();
    setLoading(false);
  }

  const getToolRegistryList = async () => {
    try {
      const accessToken = await getAccessToken();
      // sort by name ascending &sort=name&order=1
      const params = {
        sort: "name",
        order: 1
      };

      let apiUrl = "/registry?hidden=true";
      const response = await axiosApiService(accessToken).get(apiUrl, params);
      setToolRegistryList(response.data);
    } catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
  };

  const getToolList = async () => {
    try {
      const accessToken = await getAccessToken();
      const toolResponse = await axiosApiService(accessToken).get("/registry/tools", {});
      setFilterOptionList(createFilterOptionList(toolResponse.data, "tool_identifier", "name", "identifier", false));
    } catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
  };


  return (
    <>
      {showToast && toast}
      {toolRegistryList && <ToolsTable isLoading={isLoading} loadData={loadData} filterOptionList={filterOptionList}
                                       data={toolRegistryList}/>}
    </>
    );
}


export default ToolInventory;