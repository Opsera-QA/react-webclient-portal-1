import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import metricNotificationConfigurationMetadata
  from "components/notifications/details/configuration/metric/metric-notification-configuration-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MetricKpiConfigurationSelectInput
  from "components/notifications/details/configuration/metric/MetricKpiConfigurationSelectInput";
<<<<<<< Updated upstream
=======
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";
>>>>>>> Stashed changes

export default function MetricNotificationConfigurationPanel(
  {
    notificationModel,
<<<<<<< Updated upstream
=======
    setNotificationModel,
>>>>>>> Stashed changes
    notificationConfigurationModel,
    setNotificationConfigurationModel,
  }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationModel.getData("configuration"), metricNotificationConfigurationMetadata);
    setNotificationConfigurationModel({...configurationData});
  };

  if (notificationModel == null || notificationConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row>
      <Col lg={12}>
<<<<<<< Updated upstream
        <MetricKpiConfigurationSelectInput dataObject={notificationConfigurationModel} setDataObject={setNotificationConfigurationModel} fieldName={"kpi_identifier"} />
=======
        <MetricKpiConfigurationSelectInput
          dataObject={notificationConfigurationModel}
          setDataObject={setNotificationConfigurationModel}
          fieldName={"kpi_identifier"}
        />
      </Col>
      <Col lg={12}>
        <TextAreaInputBase
          fieldName={"nextSteps"}
          model={notificationModel}
          setModel={setNotificationModel}
        />
>>>>>>> Stashed changes
      </Col>
    </Row>
  );
}

MetricNotificationConfigurationPanel.propTypes = {
  notificationModel: PropTypes.object,
<<<<<<< Updated upstream
  notificationConfigurationModel: PropTypes.object,
  setNotificationConfigurationModel: PropTypes.func
=======
  setNotificationModel: PropTypes.func,
  notificationConfigurationModel: PropTypes.object,
  setNotificationConfigurationModel: PropTypes.func,
>>>>>>> Stashed changes
};
