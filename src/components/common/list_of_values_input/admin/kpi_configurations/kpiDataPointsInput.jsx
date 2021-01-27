import React from "react";
import PropTypes from "prop-types";
import kpiLovHelpers from "./kpi-lov-helpers";
import MultiSelectInputBase from "components/common/inputs/select/MultiSelectInputBase";

function KpiDataPointsInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={kpiLovHelpers.dataPoints}
      valueField="id"
      textField="label"
      disabled={disabled}
    />
  );
}

KpiDataPointsInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

KpiDataPointsInput.defaultProps = {
  fieldName: "dataPoints"
};

export default KpiDataPointsInput;