import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {
  dashboardTypeConstants
} from "components/common/list_of_values_input/insights/dashboards/types/dashboardType.constants";

function DashboardTypeSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={dashboardTypeConstants.DASHBOARD_TYPE_SELECT_OPTIONS}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

DashboardTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
};

DashboardTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default DashboardTypeSelectInput;