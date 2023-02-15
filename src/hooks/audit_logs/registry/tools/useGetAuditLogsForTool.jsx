import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {UserActivityAuditLogFilterModel} from "hooks/audit_logs/userActivityAuditLogFilter.model";
import {registryToolAuditLogActions} from "hooks/audit_logs/registry/tools/registryToolAuditLog.actions";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";

export default function useGetAuditLogsForTool(
  toolId,
  handleErrorFunction,
) {
  const [auditLogs, setAuditLogs] = useState([]);
  const [tool, setTool] = useState(undefined);
  const [toolAuditLogFilterModel, setToolAuditLogFilterModel] = useState(new UserActivityAuditLogFilterModel(auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.TOOL_REGISTRY));
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setAuditLogs([]);

    if (isMongoDbId(toolId) === true && loadData) {
      loadData(getAuditLogsForPipeline, handleErrorFunction).catch(() => {});
    }
  }, [toolId]);

  const getAuditLogsForPipeline = async (newFilterModel = toolAuditLogFilterModel) => {
    setTool(undefined);
    if (isMongoDbId(toolId) !== true) {
      return;
    }

    const response = await registryToolAuditLogActions.getAuditLogsForTool(
      getAccessToken,
      cancelTokenSource,
      toolId,
      toolAuditLogFilterModel?.getData("user"),
      toolAuditLogFilterModel?.getData("action"),
    );
    setAuditLogs(DataParsingHelper.parseArray(response?.data?.data, []));
    newFilterModel.setData("totalCount", response?.data?.count);
    newFilterModel.updateActiveFilters();
    setToolAuditLogFilterModel({...newFilterModel});
    setTool(DataParsingHelper.parseNestedObject(response, "data.tool", {}));
  };

  return ({
    auditLogs: auditLogs,
    setAuditLogs: setAuditLogs,
    tool: tool,
    toolAuditLogFilterModel: toolAuditLogFilterModel,
    setToolAuditLogFilterModel: setToolAuditLogFilterModel,
    loadData: () => loadData(getAuditLogsForPipeline, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
