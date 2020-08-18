import { axiosApiService } from "api/apiService";
import LoadingDialog from "components/common/loading";
import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./tools.css";
import ToolsTable from "./ToolsTable";
import { createFilterOptionList } from "utils/tableHelpers";

function ToolInventory () {
  let history = useHistory();
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const [toolId, setToolId] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [toolRegistryList, setToolRegistryList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);  
  const [toolList, setToolList ] = useState([]);
  const [filterOptionList, setFilterOptionList] = useState([]);

  useEffect(() => {    
    if(id && id.match(/^[0-9a-fA-F]{24}$/)) {
      setToolId(id);
    } else {
      getToolRegistryList();
      getToolList();
      setToolId("");
    }
  }, [id]);

  const getToolRegistryList = async () => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      // sort by name ascending &sort=name&order=1
      const params = {
        sort: "name",
        order: 1
      };

      let apiUrl = "/registry?hidden=true";
      const response = await axiosApiService(accessToken).get(apiUrl, params);
      setToolRegistryList(response.data);
      setLoading(false);
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
      setToolList(toolResponse.data);
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
          {toolRegistryList && <ToolsTable filterOptionList={filterOptionList} data={toolRegistryList}/>}
      </>
    );
  }
}


export default ToolInventory;