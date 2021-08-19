import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import { AuthContext } from "contexts/AuthContext";
import ToolLogsTable from "components/inventory/tools/tool_details/logs/ToolLogsTable";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import ToolLogsFilterModel from "components/inventory/tools/tool_details/logs/toolLogs.filter.model";

function ToolLogsPanel({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [logData, setLogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toolLogFilterModel, setToolLogFilterModel] = useState(new ToolLogsFilterModel());
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(toolLogFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterModel = toolLogFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getToolLogs(filterModel, cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getToolLogs = async (filterModel = toolLogFilterModel, cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getToolLogs(getAccessToken, cancelSource, toolData?.getData("_id"), filterModel);
    const toolLogs = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(toolLogs)) {
      setLogData(toolLogs);
      let newFilterDto = filterModel;
      newFilterDto.setData("totalCount", response?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setToolLogFilterModel({...newFilterDto});
    }
  };

  return (
    <>
      <div className="text-muted">
        <div className="p-3">
          <div className="h6">Tool Management Logs</div>
          <div className="mb-1">View log activity for actions performed against this tool. This includes
            creation or deletion of jobs and applications as well as registering accounts.
          </div>
        </div>
        <ToolLogsTable
          toolLogs={logData}
          isLoading={isLoading}
          loadData={loadData}
          toolLogFilterModel={toolLogFilterModel}
          setToolLogFilterModel={setToolLogFilterModel}
        />
      </div>
    </>
  );
}

ToolLogsPanel.propTypes = {
  toolData: PropTypes.object,
};

export default ToolLogsPanel;
