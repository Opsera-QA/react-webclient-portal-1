import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import kpiLovHelpers from "./kpi-lov-helpers";

function KpiChartTypeInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={kpiLovHelpers.chartTypes}
      valueField="id"
      textField="label"
      disabled={disabled}
    />
  );
}

KpiChartTypeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

KpiChartTypeInput.defaultProps = {
  fieldName: "type"
};

export default KpiChartTypeInput;