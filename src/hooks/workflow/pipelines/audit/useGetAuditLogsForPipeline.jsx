import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {pipelineAuditLogActions} from "hooks/workflow/pipelines/audit/pipelineAuditLog.actions";

export default function useGetAuditLogsForPipeline(
  pipelineId,
  handleErrorFunction,
) {
  const [auditLogs, setAuditLogs] = useState([]);
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

    if (isMongoDbId(pipelineId) === true && loadData) {
      loadData(getAuditLogsForPipeline, handleErrorFunction).catch(() => {});
    }
  }, [pipelineId]);

  const getAuditLogsForPipeline = async () => {
    if (isMongoDbId(pipelineId) !== true) {
      return;
    }

    const response = await pipelineAuditLogActions.getAuditLogsForPipeline(getAccessToken, cancelTokenSource, pipelineId);
    setAuditLogs(DataParsingHelper.parseArray(response?.data?.data, []));
  };

  return ({
    auditLogs: auditLogs,
    setAuditLogs: setAuditLogs,
    loadData: () => loadData(getAuditLogsForPipeline, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
