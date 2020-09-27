import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import "./tools.css";
import ToolsTable from "./ToolsTable";
import Model from "../../../core/data_model/model";
import toolFilterMetadata from "./tool-filter-metadata";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import toolsActions from "./tools-actions";

// TODO: Rename ToolManagement?, implement DialogToastContext
function ToolInventory () {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setLoading] = useState(false);
  const [toolRegistryList, setToolRegistryList] = useState([]);
  const [toolFilterDto, setToolFilterDto] = useState(new Model({...toolFilterMetadata.newObjectFields}, toolFilterMetadata, false));

  useEffect(() => {    
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await getToolRegistryList();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setLoading(false);
    }
  }

  // TODO: Determine best way to deal with this-- might be best to put in FilterBar
  const resetFilters = async () => {
    try {
      setLoading(true);
      let newFilterDto = new Model({...toolFilterDto.getNewObjectFields()}, toolFilterDto.getMetaData(), false);
      // TODO: Enable this when wiring up pagination
      // Make sure to keep any relevant pagination-- but always reset current page to 1 as the filters have changed
      // let pageSize = filterDto.getData("pageSize");
      // newFilterDto.setData("pageSize", pageSize);
      setToolFilterDto(newFilterDto);
      const response = await toolsActions.getToolRegistryList(newFilterDto, getAccessToken);
      setToolRegistryList(response.data.data);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setLoading(false);
    }
  };

  const getToolRegistryList = async () => {
      const response = await toolsActions.getToolRegistryList(toolFilterDto, getAccessToken);
      setToolRegistryList(response.data.data);
  };

  return (
    <ToolsTable
      isLoading={isLoading}
      loadData={loadData}
      data={toolRegistryList}
      toolFilterDto={toolFilterDto}
      setToolFilterDto={setToolFilterDto}
      resetFilters={resetFilters}
    />
  );
}


export default ToolInventory;