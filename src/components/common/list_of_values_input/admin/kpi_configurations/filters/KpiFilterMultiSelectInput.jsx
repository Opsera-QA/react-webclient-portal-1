import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {KPI_FILTER_SELECT_OPTIONS} from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";

function KpiFilterMultiSelectInput({ fieldName, model, setModel, disabled }) {
  const parseValueFunction = (selectOption) => {
    return (
      {
        type: selectOption?.type,
        value: selectOption?.value,
      }
    );
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={KPI_FILTER_SELECT_OPTIONS}
      valueField={"type"}
      textField={"text"}
      disabled={disabled}
      parseValueFunction={parseValueFunction}
    />
  );
}

KpiFilterMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

KpiFilterMultiSelectInput.defaultProps = {
  fieldName: "filters"
};

export default KpiFilterMultiSelectInput;