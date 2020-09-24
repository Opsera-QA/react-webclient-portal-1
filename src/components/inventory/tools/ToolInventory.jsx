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

      //todo: make hidden an optional filter, by default only show active
      //todo: wire up paging and replace "size" with a default of 50 records.
      //todo: wire up a sorting option with these explicit values: "oldest", "newest", "name", "lastupdated"
      // All details on how to use sorting, paging and filters will be here:
      // https://opsera.atlassian.net/wiki/spaces/OAD/pages/317751606/Tool+Registry+Tags+APIs
      //todo: can we swap the "new Tool" button placement and filters.  I'd like the button to be either
      // the top item or above the table all together, then filters should be directly above the table title bar
      let apiUrl = "/registry?size=100";
      const response = await axiosApiService(accessToken).get(apiUrl, params);
      setToolRegistryList(response.data.data);
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