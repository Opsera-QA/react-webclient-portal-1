import { React, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import ServiceNowMttrGoalsMetaData from "./servicenow-mean-time-to-resolution-goals-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PositiveIntegerNumberPickerInput from "../../../../../common/inputs/number/picker/PositiveIntegerNumberPickerInput";

function ServicenowMeanTimeToResolutionGoals({ kpiConfigurationData, setKpiConfigurationData }) {
  const [meanTimeToResolutionData, setMeanTimeToResolutionData] = useState(
    new Model(kpiConfigurationData.getData("value"), ServiceNowMttrGoalsMetaData, false)
  );

  kpiConfigurationData.setData("value", meanTimeToResolutionData.data);

  return (
    <Row>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput
          dataObject={meanTimeToResolutionData}
          setDataObject={setMeanTimeToResolutionData}
          fieldName={"mttrAvgMeanTimeGoal"}
        />
      </Col>
    </Row>
  );
}

ServicenowMeanTimeToResolutionGoals.propTypes = {
  kpiConfigurationData: PropTypes.object,
  setKpiConfigurationData: PropTypes.object,
};

export default ServicenowMeanTimeToResolutionGoals;
