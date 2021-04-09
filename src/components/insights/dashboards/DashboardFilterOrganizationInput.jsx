import React from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import OrganizationMultiSelectInput
  from "components/common/list_of_values_input/settings/organizations/OrganizationMultiSelectInput";

function DashboardFilterOrganizationInput({ dataObject, setDataObject, dashboardData, loadData, className, fieldName}) {
  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
    let newDataModel = modelHelpers.setDashboardFilterModelField(dashboardData, "organizations", value);
    loadData(newDataModel);
  };

  return (
    <OrganizationMultiSelectInput
      className={className}
      showLabel={false}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={validateAndSetData}
    />
  );
}

DashboardFilterOrganizationInput.propTypes = {
  className: PropTypes.string,
  dataObject: PropTypes.object,
  dashboardData: PropTypes.object,
  setDataObject: PropTypes.func,
  loadData: PropTypes.func,
  fieldName: PropTypes.string
};

DashboardFilterOrganizationInput.defaultProps = {
  fieldName: "organizations"
};

export default DashboardFilterOrganizationInput;


