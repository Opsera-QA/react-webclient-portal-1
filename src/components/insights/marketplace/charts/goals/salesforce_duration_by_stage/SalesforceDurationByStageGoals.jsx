import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import salesforceDurationByStageMetadata from "components/insights/marketplace/charts/goals/salesforce_duration_by_stage/salesforce-duration-by-stage-goals-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PositiveIntegerNumberPickerInput from "components/common/inputs/number/picker/PositiveIntegerNumberPickerInput";

function SalesforceDurationByStageGoals({ kpiConfigurationData, setKpiConfigurationData }) {
  const [salesforceDurationByStageConfigurationData, setSalesforceDurationByStageConfigurationData] = useState(
    new Model(kpiConfigurationData.getData("value"), salesforceDurationByStageMetadata, false)
  );
  kpiConfigurationData.setData("value", salesforceDurationByStageConfigurationData.data);
  return (
    <Row className={"mx-0"}>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput
          dataObject={salesforceDurationByStageConfigurationData}
          setDataObject={setSalesforceDurationByStageConfigurationData}
          fieldName={"average_builds"}
        />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput
          dataObject={salesforceDurationByStageConfigurationData}
          setDataObject={setSalesforceDurationByStageConfigurationData}
          fieldName={"average_deployments"}
        />
      </Col>
    </Row>
  );
}

SalesforceDurationByStageGoals.propTypes = {
  analyticsDataEntryModel: PropTypes.object,
  kpiConfigurationData: PropTypes.object,
  setKpiConfigurationData: PropTypes.func,
};

export default SalesforceDurationByStageGoals;
