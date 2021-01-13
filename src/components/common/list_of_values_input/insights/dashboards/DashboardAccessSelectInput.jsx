import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {dashboardAccess} from "components/insights/dashboards/dashboard-metadata";

function DashboardAccessSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={dashboardAccess}
      valueField="type"
      textField="value"
      disabled={disabled}
    />
  );
}

DashboardAccessSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

DashboardAccessSelectInput.defaultProps = {
  fieldName: "visibility",
};

export default DashboardAccessSelectInput;