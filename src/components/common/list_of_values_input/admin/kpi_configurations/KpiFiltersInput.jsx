import React from "react";
import PropTypes from "prop-types";
import kpiLovHelpers from "./kpi-lov-helpers";
import MultiSelectInputBase from "../../../inputs/MultiSelectInputBase";

function KpiFiltersInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={kpiLovHelpers.filters}
      valueField="id"
      textField="label"
      disabled={disabled}
    />
  );
}

KpiFiltersInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

KpiFiltersInput.defaultProps = {
  fieldName: "filters"
};

export default KpiFiltersInput;