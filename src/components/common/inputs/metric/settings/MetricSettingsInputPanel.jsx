import React, {useState} from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer
  from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import {KPI_FILTER_TYPES} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import modelHelpers from "components/common/model/modelHelpers";

// TODO: If we eventually support different settings per KPI Identifier, make this more similar to ToolConfigurationPanel
function MetricSettingsInputPanel(
  {
    metricModel,
    setMetricModel,
    metricSettings,
  }) {
  const [kpiSettingsModel, setKpiSettingsModel] = useState(modelHelpers.getDashboardSettingsModel(metricModel?.data));

  const updateParentModel = (updatedModel) => {
    const newModel = {...metricModel};
    setKpiSettingsModel({...updatedModel});
    const newSettings = updatedModel?.getPersistData();
    newModel.setData("settings", newSettings);
    setMetricModel({...newModel});
  };

  return (
    <SupportedMetricFilterInputContainer
      filterType={KPI_FILTER_TYPES.TAGS}
      supportedFilters={metricModel?.getData("filters")}
    >
      <Row>
        <Col md={6}>
          <BooleanToggleInput
            fieldName={"useKpiTags"}
            dataObject={kpiSettingsModel}
            setDataObject={updateParentModel}
          />
        </Col>
        <Col md={6}>
          <BooleanToggleInput
            fieldName={"useDashboardTags"}
            dataObject={kpiSettingsModel}
            setDataObject={updateParentModel}
          />
        </Col>
      </Row>
    </SupportedMetricFilterInputContainer>
  );
}

MetricSettingsInputPanel.propTypes = {
  metricModel: PropTypes.object,
  setMetricModel: PropTypes.func,
  metricSettings: PropTypes.object,
};

export default MetricSettingsInputPanel;