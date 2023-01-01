import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {UserActivityAuditLogFilterModel} from "hooks/audit_logs/userActivityAuditLogFilter.model";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";
import useCustomerPipelineTemplateAuditLogActions
  from "hooks/audit_logs/pipelines/templates/customer/useCustomerPipelineTemplateAuditLogActions";

export default function useGetAuditLogsForCustomerPipelineTemplate(
  templateId,
  handleErrorFunction,
) {
  const [auditLogs, setAuditLogs] = useState([]);
  const [auditLogFilterModel, setAuditLogFilterModel] = useState(new UserActivityAuditLogFilterModel(auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.PIPELINE_TEMPLATE));
  const [pipelineTemplate, setPipelineTemplate] = useState(undefined);
  const customerPipelineTemplateAuditLogActions = useCustomerPipelineTemplateAuditLogActions();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setAuditLogs([]);

    if (isMongoDbId(templateId) === true && loadData) {
      loadData(getAuditLogsForCustomerPipelineTemplate, handleErrorFunction).catch(() => {});
    }
  }, [templateId]);

  const getAuditLogsForCustomerPipelineTemplate = async (newFilterModel = auditLogFilterModel) => {
    if (isMongoDbId(templateId) !== true) {
      return;
    }
    setAuditLogs([]);

    const response = await customerPipelineTemplateAuditLogActions.getAuditLogsForCustomerPipelineTemplate(
      templateId,
      auditLogFilterModel?.getData("user"),
      auditLogFilterModel?.getData("actions"),
      auditLogFilterModel?.getData("siteRoles"),
      auditLogFilterModel?.getDateRangeFilterObject(),
    );
    setPipelineTemplate(DataParsingHelper.parseObject(response?.data?.template, {}));
    setAuditLogs(DataParsingHelper.parseArray(response?.data?.data, []));
    newFilterModel.setData("totalCount", response?.data?.count);
    newFilterModel.updateActiveFilters();
    setAuditLogFilterModel({...newFilterModel});
  };

  return ({
    auditLogs: auditLogs,
    setAuditLogs: setAuditLogs,
    auditLogFilterModel: auditLogFilterModel,
    setAuditLogFilterModel: setAuditLogFilterModel,
    pipelineTemplate: pipelineTemplate,
    loadData: () => loadData(getAuditLogsForCustomerPipelineTemplate, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
