import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {pipelineAuditLogActions} from "hooks/audit_logs/pipelines/audit/pipelineAuditLog.actions";
import {UserActivityAuditLogFilterModel} from "hooks/audit_logs/userActivityAuditLogFilter.model";

export default function useGetAuditLogsForPipeline(
  pipelineId,
  handleErrorFunction,
) {
  const [auditLogs, setAuditLogs] = useState([]);
  const [pipelineAuditLogFilterModel, setPipelineAuditLogFilterModel] = useState(new UserActivityAuditLogFilterModel());
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
      pipelineAuditLogFilterModel?.getData("action"),
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
