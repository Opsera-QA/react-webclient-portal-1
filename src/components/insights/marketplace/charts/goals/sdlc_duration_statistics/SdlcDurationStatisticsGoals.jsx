import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import sdlcDurationByStageMetadata
  from "components/insights/marketplace/charts/goals/sdlc_duration_statistics/sdlc-duration-statistics-goals-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PositiveIntegerNumberPickerInput from "components/common/inputs/number/picker/PositiveIntegerNumberPickerInput";

function SdlcDurationStatisticsGoals({ kpiConfigurationData, setKpiConfigurationData }) {
  const [sdlcDurationByStageConfigurationData, setSdlcDurationByStageConfigurationData] = 
      useState(new Model(kpiConfigurationData.getData("value"), sdlcDurationByStageMetadata, false));
  kpiConfigurationData.setData("value", sdlcDurationByStageConfigurationData.data);
  return (
    <Row className={"mx-0"}>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={sdlcDurationByStageConfigurationData} setDataObject={setSdlcDurationByStageConfigurationData} fieldName={"average_builds"} />
      </Col> 
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={sdlcDurationByStageConfigurationData} setDataObject={setSdlcDurationByStageConfigurationData} fieldName={"average_deploy"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={sdlcDurationByStageConfigurationData} setDataObject={setSdlcDurationByStageConfigurationData} fieldName={"average_quality_scan"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={sdlcDurationByStageConfigurationData} setDataObject={setSdlcDurationByStageConfigurationData} fieldName={"average_security_scan"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={sdlcDurationByStageConfigurationData} setDataObject={setSdlcDurationByStageConfigurationData} fieldName={"average_test"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={sdlcDurationByStageConfigurationData} setDataObject={setSdlcDurationByStageConfigurationData} fieldName={"average_scripts"} />
      </Col>
    </Row>
  );
}

SdlcDurationStatisticsGoals.propTypes = {
  analyticsDataEntryModel: PropTypes.object,
  kpiConfigurationData: PropTypes.object,
  setKpiConfigurationData: PropTypes.func,
};

export default SdlcDurationStatisticsGoals;
