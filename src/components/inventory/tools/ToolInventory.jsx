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
  const [activeToolFilterDto, setActiveToolFilterDto] = useState(undefined);

  useEffect(() => {    
    loadData();
  }, []);

  const loadData = async (filterDto = toolFilterDto) => {
    try {
      setLoading(true);
      await getToolRegistryList(filterDto);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setLoading(false);
    }
  }

  const getToolRegistryList = async (filterDto = toolFilterDto) => {
      const response = await toolsActions.getToolRegistryList(filterDto, getAccessToken);
      setToolRegistryList(response.data.data);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      setToolFilterDto({...newFilterDto});
      setActiveToolFilterDto(newFilterDto.clone());
  };

  return (
    <ToolsTable
      isLoading={isLoading}
      loadData={loadData}
      data={toolRegistryList}
      toolFilterDto={toolFilterDto}
      setToolFilterDto={setToolFilterDto}
      activeToolFilterDto={activeToolFilterDto}
    />
  );
}


export default ToolInventory;