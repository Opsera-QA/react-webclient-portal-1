import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {pipelineAuditLogActions} from "hooks/workflow/pipelines/audit/pipelineAuditLog.actions";

export default function useGetPipelineAuditLogById(
  pipelineId,
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

    if (isMongoDbId(pipelineId) === true && isMongoDbId(auditLogId) === true && loadData) {
      loadData(getAuditLogsForPipeline, handleErrorFunction).catch(() => {});
    }
  }, [pipelineId, auditLogId]);

  const getAuditLogsForPipeline = async () => {
    if (isMongoDbId(pipelineId) !== true || isMongoDbId(auditLogId) !== true) {
      return;
    }

    const response = await pipelineAuditLogActions.getPipelineAuditLogById(
      getAccessToken,
      cancelTokenSource,
      pipelineId,
      auditLogId,
    );
    setAuditLog(DataParsingHelper.parseNestedObject(response, "data.data", undefined));
  };

  return ({
    auditLog: auditLog,
    setAuditLog: setAuditLog,
    loadData: () => loadData(getAuditLogsForPipeline, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
