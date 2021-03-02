import React from "react";
import PropTypes from "prop-types";
import DashboardSelectInput from "components/common/list_of_values_input/insights/dashboards/DashboardSelectInput";

function MarketplaceDashboardInput({ fieldName, dataObject, setDataObject, disabled }) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("dashboard", value);
    setDataObject({...newDataObject});
  };

  return (
    <DashboardSelectInput
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

MarketplaceDashboardInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  setDataFunction: PropTypes.func
};

MarketplaceDashboardInput.defaultProps = {
  fieldName: "dashboard",
};

export default MarketplaceDashboardInput;