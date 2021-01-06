import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import metricNotificationConfigurationMetadata
  from "components/notifications/notification_details/configuration_forms/metric/metric-notification-configuration-metadata";
import KpiSelectInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiSelectInput";
import Row from "react-bootstrap/Row";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import Col from "react-bootstrap/Col";

function MetricNotificationConfigurationPanel({ notificationDataDto, notificationConfigurationData, setNotificationConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationDataDto.getData("configuration"), metricNotificationConfigurationMetadata);
    setNotificationConfigurationData({...configurationData});
  };

  if (notificationDataDto == null || notificationConfigurationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row>
      <Col lg={12}>
        <KpiSelectInput dataObject={notificationConfigurationData} setDataObject={setNotificationConfigurationData} fieldName={"kpi_identifier"} />
      </Col>
      <Col lg={12}>
        <TextAreaInput dataObject={notificationConfigurationData} setDataObject={setNotificationConfigurationData} fieldName={"trigger"} />
      </Col>
    </Row>
  );
}

MetricNotificationConfigurationPanel.propTypes = {
  notificationDataDto: PropTypes.object,
  notificationConfigurationData: PropTypes.object,
  setNotificationConfigurationData: PropTypes.func
};

export default MetricNotificationConfigurationPanel;


