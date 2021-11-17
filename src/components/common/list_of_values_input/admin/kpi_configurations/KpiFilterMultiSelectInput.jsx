import React from "react";
import PropTypes from "prop-types";
import kpiLovHelpers from "./kpi-lov-helpers";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function KpiFilterMultiSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={kpiLovHelpers.filters}
      valueField={"id"}
      textField={"label"}
      disabled={disabled}
    />
  );
}

KpiFilterMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

KpiFilterMultiSelectInput.defaultProps = {
  fieldName: "filters"
};

export default KpiFilterMultiSelectInput;