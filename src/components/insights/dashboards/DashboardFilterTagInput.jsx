import React from "react";
import PropTypes from "prop-types";
import TagMultiSelectInputBase from "components/common/list_of_values_input/settings/tags/TagMultiSelectInputBase";
import modelHelpers from "components/common/model/modelHelpers";

function DashboardFilterTagInput({ dataObject, setDataObject, dashboardData, loadData, className, fieldName}) {
  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
    let newDataModel = modelHelpers.setDashboardFilterModelField(dashboardData, "tags", value);
    loadData(newDataModel);
  };

  return (
    <TagMultiSelectInputBase
      className={className}
      showLabel={false}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={validateAndSetData}
    />
  );
}

DashboardFilterTagInput.propTypes = {
  className: PropTypes.string,
  dataObject: PropTypes.object,
  dashboardData: PropTypes.object,
  setDataObject: PropTypes.func,
  loadData: PropTypes.func,
  saveData: PropTypes.func,
  fieldName: PropTypes.string
};

DashboardFilterTagInput.defaultProps = {
  fieldName: "value"
};

export default DashboardFilterTagInput;


