import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {KPI_CATEGORY_SELECT_OPTIONS} from "components/common/list_of_values_input/admin/kpi_configurations/categories/kpiCategory.types";

function KpiCategoryMultiSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={KPI_CATEGORY_SELECT_OPTIONS}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

KpiCategoryMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
};

KpiCategoryMultiSelectInput.defaultProps = {
  fieldName: "category"
};

export default KpiCategoryMultiSelectInput;