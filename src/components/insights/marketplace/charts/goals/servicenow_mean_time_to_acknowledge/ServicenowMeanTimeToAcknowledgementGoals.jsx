import { React, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import ServiceNowMeanTimeToAckMetadata from "./servicenow-mean-time-to-acknowledgement-goals-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PositiveIntegerNumberPickerInput from "../../../../../common//inputs/number/picker/PositiveIntegerNumberPickerInput";

function ServicenowMeanTimeToAcknowledgementGoals({ kpiConfigurationData, setKpiConfigurationData }) {
  const [meanTimeToAcknowledgementData, setMeanTimeToAcknowledgementData] = useState(
    new Model(kpiConfigurationData.getData("value"), ServiceNowMeanTimeToAckMetadata, false)
  );

  kpiConfigurationData.setData("value", meanTimeToAcknowledgementData.data);

  return (
    <Row>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput
          dataObject={meanTimeToAcknowledgementData}
          setDataObject={setMeanTimeToAcknowledgementData}
          fieldName={"mttaAvgMeanTimeGoal"}
        />
      </Col>
    </Row>
  );
}

ServicenowMeanTimeToAcknowledgementGoals.propTypes = {
  kpiConfigurationData: PropTypes.object,
  setKpiConfigurationData: PropTypes.object,
};

export default ServicenowMeanTimeToAcknowledgementGoals;
