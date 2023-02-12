import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {instructionsAuditLogActions} from "hooks/audit_logs/instructions/instructionsAuditLog.actions";
import {UserActivityAuditLogFilterModel} from "hooks/audit_logs/userActivityAuditLogFilter.model";

export default function useGetAuditLogsForInstructions(
  instructionsId,
  handleErrorFunction,
) {
  const [auditLogs, setAuditLogs] = useState([]);
  const [instructionsAuditLogFilterModel, setInstructionsAuditLogFilterModel] = useState(new UserActivityAuditLogFilterModel());
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

    if (isMongoDbId(instructionsId) === true && loadData) {
      loadData(getAuditLogsForInstructions, handleErrorFunction).catch(() => {});
    }
  }, [instructionsId]);

  const getAuditLogsForInstructions = async (newFilterModel = instructionsAuditLogFilterModel) => {
    if (isMongoDbId(instructionsId) !== true) {
      return;
    }

    const response = await instructionsAuditLogActions.getAuditLogsForInstructions(
      getAccessToken,
      cancelTokenSource,
      instructionsId,
      instructionsAuditLogFilterModel?.getData("user"),
      instructionsAuditLogFilterModel?.getData("action"),
    );
    setAuditLogs(DataParsingHelper.parseArray(response?.data?.data, []));
    newFilterModel.setData("totalCount", response?.data?.count);
    newFilterModel.updateActiveFilters();
    setInstructionsAuditLogFilterModel({...newFilterModel});
  };

  return ({
    auditLogs: auditLogs,
    setAuditLogs: setAuditLogs,
    instructionsAuditLogFilterModel: instructionsAuditLogFilterModel,
    setInstructionsAuditLogFilterModel: setInstructionsAuditLogFilterModel,
    loadData: () => loadData(getAuditLogsForInstructions, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
