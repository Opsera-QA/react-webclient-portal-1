import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import MetricConfigurationInput
  from "components/notifications/details/configuration_forms/metric/MetricKpiConfigurationSelectInput";

// TODO: Rename with whatever is relevant after more details are given. This is probably not how we'll wire it up exactly, I just wanted a placeholder
function MetricNotificationConfigurationCard({ notificationDataDto, notificationConfigurationData, setNotificationConfigurationData }) {
  if (notificationDataDto == null || notificationConfigurationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <MetricConfigurationInput dataObject={notificationConfigurationData} setDataObject={setNotificationConfigurationData} fieldName={"kpi_identifier"} />
  );
}

MetricNotificationConfigurationCard.propTypes = {
  notificationDataDto: PropTypes.object,
  notificationConfigurationData: PropTypes.object,
  setNotificationConfigurationData: PropTypes.func
};

export default MetricNotificationConfigurationCard;


