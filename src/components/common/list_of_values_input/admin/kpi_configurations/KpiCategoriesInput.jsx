import React from "react";
import PropTypes from "prop-types";
import kpiLovHelpers from "./kpi-lov-helpers";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function KpiCategoriesInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={kpiLovHelpers.categories}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

KpiCategoriesInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
};

KpiCategoriesInput.defaultProps = {
  fieldName: "category"
};

export default KpiCategoriesInput;