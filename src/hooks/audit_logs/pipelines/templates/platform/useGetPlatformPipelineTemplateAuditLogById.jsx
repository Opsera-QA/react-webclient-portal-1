import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePlatformPipelineTemplateAuditLogActions
  from "hooks/audit_logs/pipelines/templates/platform/usePlatformPipelineTemplateAuditLogActions";

export default function useGetPlatformPipelineTemplateAuditLogById(
  templateId,
  auditLogId,
  handleErrorFunction,
) {
  const [auditLog, setAuditLog] = useState(undefined);
  const platformPipelineTemplateAuditLogActions = usePlatformPipelineTemplateAuditLogActions();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setAuditLog(undefined);

    if (isMongoDbId(templateId) === true && isMongoDbId(auditLogId) === true && loadData) {
      loadData(getAuditLogsForPlatformPipelineTemplate, handleErrorFunction).catch(() => {});
    }
  }, [templateId, auditLogId]);

  const getAuditLogsForPlatformPipelineTemplate = async () => {
    if (isMongoDbId(templateId) !== true || isMongoDbId(auditLogId) !== true) {
      return;
    }

    const response = await platformPipelineTemplateAuditLogActions.getAuditLogsForPlatformPipelineTemplate(
      templateId,
      auditLogId,
    );
    setAuditLog(DataParsingHelper.parseNestedObject(response, "data.data", undefined));
  };

  return ({
    auditLog: auditLog,
    setAuditLog: setAuditLog,
    loadData: () => loadData(getAuditLogsForPlatformPipelineTemplate, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
