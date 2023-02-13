import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import NotificationTypeSummaryCardContainer from "components/notifications/details/configuration_forms/NotificationTypeSummaryCardContainer";

function PipelineNotificationTypeSummaryCard({ notificationData, notificationConfigurationData, isLoading }) {
  if (isLoading) {
    return <NotificationTypeSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <NotificationTypeSummaryCardContainer notificationData={notificationData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={notificationConfigurationData} fieldName={"trigger"} />
      </div>
    </NotificationTypeSummaryCardContainer>
  );
}

PipelineNotificationTypeSummaryCard.propTypes = {
  notificationData: PropTypes.object,
  notificationConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default PipelineNotificationTypeSummaryCard;
