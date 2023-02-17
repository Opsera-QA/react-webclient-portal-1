import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import NotificationTypeSummaryCardContainer from "components/notifications/details/configuration/NotificationTypeSummaryCardContainer";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
import AuditLogNotificationTargetField
  from "components/notifications/details/configuration/audit_log/fields/AuditLogNotificationTargetField";

export default function AuditLogNotificationTypeSummaryCard({ notificationData, notificationConfigurationData, isLoading }) {
  if (isLoading) {
    return <NotificationTypeSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <NotificationTypeSummaryCardContainer
      notificationData={notificationData}
      isLoading={isLoading}
    >
      <AuditLogNotificationTargetField
        model={notificationData}
      />
      <GenericItemField
        dataObject={notificationConfigurationData}
        fieldName={"events"}
      />
    </NotificationTypeSummaryCardContainer>
  );
}

AuditLogNotificationTypeSummaryCard.propTypes = {
  notificationData: PropTypes.object,
  notificationConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};
