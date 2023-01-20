import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {registryToolAuditLogActions} from "hooks/audit_logs/registry/tools/registryToolAuditLog.actions";

export default function useGetRegistryToolAuditLogById(
  toolId,
  auditLogId,
  handleErrorFunction,
) {
  const [auditLog, setAuditLog] = useState(undefined);
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
    setAuditLog(undefined);

    if (isMongoDbId(toolId) === true && isMongoDbId(auditLogId) === true && loadData) {
      loadData(getAuditLogsForTool, handleErrorFunction).catch(() => {});
    }
  }, [toolId, auditLogId]);

  const getAuditLogsForTool = async () => {
    if (isMongoDbId(toolId) !== true || isMongoDbId(auditLogId) !== true) {
      return;
    }

    const response = await registryToolAuditLogActions.getToolAuditLogById(
      getAccessToken,
      cancelTokenSource,
      toolId,
      auditLogId,
    );
    setAuditLog(DataParsingHelper.parseNestedObject(response, "data.data", undefined));
  };

  return ({
    auditLog: auditLog,
    setAuditLog: setAuditLog,
    loadData: () => loadData(getAuditLogsForTool, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
