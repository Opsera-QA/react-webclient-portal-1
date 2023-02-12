import React, {useEffect} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firstPassYieldMetadata
  from "components/settings/analytics_data_entry/detail_view/configuration_panels/first_pass_yield/first-pass-yield-metadata";
import PipelineSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineSelectInput";
import DateTimeRangeInputBase from "components/common/inputs/date/DateTimeRangeInputBase";
import ManualKpiMultiSelectInputBase
  from "components/common/list_of_values_input/settings/analytics/ManualKpiMultiSelectInputBase";
import PositiveIntegerNumberPickerInput from "components/common/inputs/number/picker/PositiveIntegerNumberPickerInput";

function FirstPassYieldConfiguration({ analyticsDataEntryModel, kpiConfigurationData, setKpiConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(analyticsDataEntryModel.getData("data"), firstPassYieldMetadata);
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
        <PositiveIntegerNumberPickerInput dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"total_test_cases"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"test_cases_passed"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"test_cases_failed"} />
      </Col>
    </Row>
  );
}

FirstPassYieldConfiguration.propTypes = {
  analyticsDataEntryModel: PropTypes.object,
  kpiConfigurationData: PropTypes.object,
  setKpiConfigurationData: PropTypes.func,
};

export default FirstPassYieldConfiguration;
