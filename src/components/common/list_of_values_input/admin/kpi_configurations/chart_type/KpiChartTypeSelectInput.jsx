import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {KPI_CHART_TYPE_SELECT_OPTIONS} from "components/common/list_of_values_input/admin/kpi_configurations/chart_type/kpiChart.types";

function KpiChartTypeSelectInput({ fieldName, model, setModel, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={KPI_CHART_TYPE_SELECT_OPTIONS}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

KpiChartTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

KpiChartTypeSelectInput.defaultProps = {
  fieldName: "type"
};

export default KpiChartTypeSelectInput;