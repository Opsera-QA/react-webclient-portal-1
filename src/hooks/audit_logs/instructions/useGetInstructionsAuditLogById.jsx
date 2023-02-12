import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {instructionsAuditLogActions} from "hooks/audit_logs/instructions/instructionsAuditLog.actions";

export default function useGetInstructionsAuditLogById(
  instructionsId,
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

    if (isMongoDbId(instructionsId) === true && isMongoDbId(auditLogId) === true && loadData) {
      loadData(getAuditLogsForInstructions, handleErrorFunction).catch(() => {});
    }
  }, [instructionsId, auditLogId]);

  const getAuditLogsForInstructions = async () => {
    if (isMongoDbId(instructionsId) !== true || isMongoDbId(auditLogId) !== true) {
      return;
    }

    const response = await instructionsAuditLogActions.getInstructionsAuditLogById(
      getAccessToken,
      cancelTokenSource,
      instructionsId,
      auditLogId,
    );
    setAuditLog(DataParsingHelper.parseNestedObject(response, "data.data", undefined));
  };

  return ({
    auditLog: auditLog,
    setAuditLog: setAuditLog,
    loadData: () => loadData(getAuditLogsForInstructions, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
