import React from "react";
import PropTypes from "prop-types";
import TagMultiSelectInputBase from "components/common/list_of_values_input/settings/tags/TagMultiSelectInputBase";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import modelHelpers from "components/common/model/modelHelpers";

function DashboardFilterTagInput({ dataObject, setDataObject, dashboardData, loadData, saveData, className, fieldName}) {
  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
    let newDataModel = modelHelpers.setDashboardFilterModelField(dashboardData, "tags", value);
    loadData(newDataModel);
  };

  return (
    <div className="d-flex my-auto">
      <TagMultiSelectInputBase
        className={className}
        showLabel={false}
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={validateAndSetData}
      />
      <div className={"mx-2"}>
        <LenientSaveButton size={"sm"} recordDto={dashboardData} updateRecord={saveData}/>
      </div>
    </div>
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
}

export default DashboardFilterTagInput;


