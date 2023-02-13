import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import metricNotificationConfigurationMetadata
  from "components/notifications/details/configuration_forms/metric/metric-notification-configuration-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MetricKpiConfigurationSelectInput
  from "components/notifications/details/configuration_forms/metric/MetricKpiConfigurationSelectInput";

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
        <MetricKpiConfigurationSelectInput dataObject={notificationConfigurationData} setDataObject={setNotificationConfigurationData} fieldName={"kpi_identifier"} />
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


