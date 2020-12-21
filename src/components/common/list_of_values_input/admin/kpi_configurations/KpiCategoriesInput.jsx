import React from "react";
import PropTypes from "prop-types";
import kpiLovHelpers from "./kpi-lov-helpers";
import MultiSelectInputBase from "../../../inputs/MultiSelectInputBase";

function KpiCategoriesInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={kpiLovHelpers.categories}
      valueField="id"
      textField="label"
      disabled={disabled}
    />
  );
}

KpiCategoriesInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

KpiCategoriesInput.defaultProps = {
  fieldName: "categories"
};

export default KpiCategoriesInput;