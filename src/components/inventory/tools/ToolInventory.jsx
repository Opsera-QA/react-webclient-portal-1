import { axiosApiService } from "api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import "./tools.css";
import ToolsTable from "./ToolsTable";
import {createFilterOptionList} from "../../../utils/tableHelpers";

function ToolInventory () {
  const { getAccessToken } = useContext(AuthContext);
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [toolRegistryList, setToolRegistryList] = useState([]);
  const [filterOptionList, setFilterOptionList] = useState([]);

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
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };

  const getToolList = async () => {
    try {
      const accessToken = await getAccessToken();
      const toolResponse = await axiosApiService(accessToken).get("/registry/tools", {});
      setFilterOptionList(createFilterOptionList(toolResponse.data, "tool_identifier", "name", "identifier", false));
    }
    catch (err) {
      setErrors(err.message);
      console.log(err.message);
    }
  };


  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <>
          {errors && <div className="error-text">Error Reported: {errors}</div>}
          {toolRegistryList && <ToolsTable loadData={loadData} filterOptionList={filterOptionList} data={toolRegistryList}/>}
      </>
    );
  }
}


export default ToolInventory;