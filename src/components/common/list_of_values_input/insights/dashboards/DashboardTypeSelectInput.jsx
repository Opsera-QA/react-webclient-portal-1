import React from "react";
import PropTypes from "prop-types";
import {dashboardTypes} from "../../../../insights/dashboard-metadata";
import SelectInputBase from "../../../inputs/SelectInputBase";

function DashboardTypeSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={dashboardTypes}
      valueField="type"
      textField="value"
      disabled={disabled}
    />
  );
}

DashboardTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

DashboardTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default DashboardTypeSelectInput;