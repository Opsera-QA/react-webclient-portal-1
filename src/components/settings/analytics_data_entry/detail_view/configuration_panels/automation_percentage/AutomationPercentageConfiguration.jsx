import React, {useEffect} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import automationPercentageMetadata
  from "components/settings/analytics_data_entry/detail_view/configuration_panels/automation_percentage/automation-percentage-metadata";
import PipelineSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineSelectInput";
import DateTimeRangeInputBase from "components/common/inputs/date/DateTimeRangeInputBase";
import ManualKpiMultiSelectInputBase
  from "components/common/list_of_values_input/settings/analytics/ManualKpiMultiSelectInputBase";
import PositiveIntegerNumberPickerInput from "components/common/inputs/number/picker/PositiveIntegerNumberPickerInput";

function AutomationPercentageConfiguration({ analyticsDataEntryModel, kpiConfigurationData, setKpiConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(analyticsDataEntryModel.getData("data"), automationPercentageMetadata);
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
      <Col lg={6}>
        <ManualKpiMultiSelectInputBase dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"project"} type={"project"} />
      </Col>
      <Col lg={12}>
        <DateTimeRangeInputBase dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fromFieldName={"from"} toFieldName={"to"} />
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
        <PositiveIntegerNumberPickerInput dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"total_tests"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"total_automated"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"functional_tests"} />
      </Col>
      <Col lg={6}>
        <PositiveIntegerNumberPickerInput dataObject={kpiConfigurationData} setDataObject={setKpiConfigurationData} fieldName={"regression_tests"} />
      </Col>
    </Row>
  );
}

AutomationPercentageConfiguration.propTypes = {
  analyticsDataEntryModel: PropTypes.object,
  kpiConfigurationData: PropTypes.object,
  setKpiConfigurationData: PropTypes.func,
};

export default AutomationPercentageConfiguration;