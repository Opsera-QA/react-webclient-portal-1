import React, {useEffect} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cumulativeOpenDefectsMetadata
  from "components/settings/analytics_data_entry/detail_view/configuration_panels/cumulative_open_defects/cumulative-open-defects-metadata";
import PipelineSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineSelectInput";
import DateTimeRangeInputBase from "components/common/inputs/date/DateTimeRangeInputBase";
import ManualKpiMultiSelectInputBase
  from "components/common/list_of_values_input/settings/analytics/ManualKpiMultiSelectInputBase";
import PositiveIntegerNumberPickerInput from "components/common/inputs/number/picker/PositiveIntegerNumberPickerInput";

function CumulativeOpenDefectsConfiguration({ analyticsDataEntryModel, kpiConfigurationData, setKpiConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(analyticsDataEntryModel.getData("data"), cumulativeOpenDefectsMetadata);
    setKpiConfigurationData({...configurationData});
  };

  if (kpiConfigurationData == null || analyticsDataEntryModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row className={"mx-0"}>
      <Col lg={6}>
        <ManualKpiMultiSelectInputBase dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"domain"} type={"domain"} />
      </Col>
      <Col lg={6}>
        <ManualKpiMultiSelectInputBase dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"application"} type={"application"} />
      </Col>
      <Col lg={12}>
        <DateTimeRangeInputBase model={kpiConfigurationData} setModel={setKpiConfigurationData} fromFieldName={"from"} toFieldName={"to"} />
      </Col>
      <Col lg={6}>
        <PipelineSelectInput dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"pipeline_id"} />
      </Col>
      <Col lg={6}>
        <ManualKpiMultiSelectInputBase dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"sprint"} type={"sprint"} />
      </Col>
      <Col lg={6}>
        <ManualKpiMultiSelectInputBase dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"release"} type={"release"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"total_defects"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"valid_defects_open"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"valid_defects_closed"} />
      </Col>
    </Row>
  );
}

CumulativeOpenDefectsConfiguration.propTypes = {
  analyticsDataEntryModel: PropTypes.object,
  kpiConfigurationData: PropTypes.object,
  setKpiConfigurationData: PropTypes.func,
};

export default CumulativeOpenDefectsConfiguration;