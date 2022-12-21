import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {pipelineAuditLogActions} from "hooks/audit_logs/pipelines/pipelineAuditLog.actions";
import {UserActivityAuditLogFilterModel} from "hooks/audit_logs/userActivityAuditLogFilter.model";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";

export default function useGetAuditLogsForPipeline(
  pipelineId,
  handleErrorFunction,
) {
  const [auditLogs, setAuditLogs] = useState([]);
  const [pipelineAuditLogFilterModel, setPipelineAuditLogFilterModel] = useState(new UserActivityAuditLogFilterModel(auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.PIPELINE));
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

  const getAuditLogsForPipeline = async (newFilterModel = pipelineAuditLogFilterModel) => {
    if (isMongoDbId(pipelineId) !== true) {
      return;
    }

    const response = await pipelineAuditLogActions.getAuditLogsForPipeline(
      getAccessToken,
      cancelTokenSource,
      pipelineId,
      pipelineAuditLogFilterModel?.getData("user"),
      pipelineAuditLogFilterModel?.getData("actions"),
    );
    setAuditLogs(DataParsingHelper.parseArray(response?.data?.data, []));
    newFilterModel.setData("totalCount", response?.data?.count);
    newFilterModel.updateActiveFilters();
    setPipelineAuditLogFilterModel({...newFilterModel});
  };

  return ({
    auditLogs: auditLogs,
    setAuditLogs: setAuditLogs,
    pipelineAuditLogFilterModel: pipelineAuditLogFilterModel,
    setPipelineAuditLogFilterModel: setPipelineAuditLogFilterModel,
    loadData: () => loadData(getAuditLogsForPipeline, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
