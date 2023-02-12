import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useCustomerPipelineTemplateAuditLogActions
  from "hooks/audit_logs/pipelines/templates/customer/useCustomerPipelineTemplateAuditLogActions";

export default function useGetCustomerPipelineTemplateAuditLogById(
  templateId,
  auditLogId,
  handleErrorFunction,
) {
  const [auditLog, setAuditLog] = useState(undefined);
  const customerPipelineTemplateAuditLogActions = useCustomerPipelineTemplateAuditLogActions();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setAuditLog(undefined);

    if (isMongoDbId(templateId) === true && isMongoDbId(auditLogId) === true && loadData) {
      loadData(getAuditLogsForCustomerPipelineTemplate, handleErrorFunction).catch(() => {});
    }
  }, [templateId, auditLogId]);

  const getAuditLogsForCustomerPipelineTemplate = async () => {
    if (isMongoDbId(templateId) !== true || isMongoDbId(auditLogId) !== true) {
      return;
    }

    const response = await customerPipelineTemplateAuditLogActions.getCustomerPipelineTemplateAuditLogById(
      templateId,
      auditLogId,
    );
    setAuditLog(DataParsingHelper.parseNestedObject(response, "data.data", undefined));
  };

  return ({
    auditLog: auditLog,
    setAuditLog: setAuditLog,
    loadData: () => loadData(getAuditLogsForCustomerPipelineTemplate, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
