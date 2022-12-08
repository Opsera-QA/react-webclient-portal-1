import modelHelpers from "components/common/model/modelHelpers";
import userActivityAuditLogMetadata from "@opsera/definitions/constants/audit-logs/user/userActivityAuditLog.metadata";

export default function useGetUserActivityAuditLogModel() {
  const getUserActivityAuditLogModel = (auditLog) => {
    return modelHelpers.parseObjectIntoModel(auditLog, userActivityAuditLogMetadata);
  };

  return ({
    getUserActivityAuditLogModel: getUserActivityAuditLogModel,
  });
}
