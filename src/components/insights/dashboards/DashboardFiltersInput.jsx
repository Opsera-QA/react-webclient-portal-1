import React from "react";
import PropTypes from "prop-types";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import DashboardFilterTagInput from "components/insights/dashboards/DashboardFilterTagInput";
import DashboardFilterOrganizationInput from "components/insights/dashboards/DashboardFilterOrganizationInput";

function DashboardFiltersInput({ dataObject, setDataObject, dashboardData, loadData, saveData, className}) {
  return (
    <div className={className}>
      <div className="d-flex my-auto">
        <DashboardFilterTagInput
          dataObject={dataObject}
          setDataObject={setDataObject}
          dashboardData={dashboardData}
          fieldName={"value"}
          loadData={loadData}
        />
        {/*<DashboardFilterOrganizationInput*/}
        {/*  className={"mx-2"}*/}
        {/*  dataObject={dataObject}*/}
        {/*  setDataObject={setDataObject}*/}
        {/*  dashboardData={dashboardData}*/}
        {/*  fieldName={"organizations"}*/}
        {/*  loadData={loadData}*/}
        {/*  saveData={saveData}*/}
        {/*/>*/}
        {saveData && <TooltipWrapper innerText={"Saves dashboard view with current settings applied"}>
          <div className={"mx-2"}>
            <LenientSaveButton customLabel={"Save View"} size={"sm"} recordDto={dashboardData} updateRecord={saveData}/>
          </div>
        </TooltipWrapper>}
      </div>
    </div>
  );
}

DashboardFiltersInput.propTypes = {
  className: PropTypes.string,
  dataObject: PropTypes.object,
  dashboardData: PropTypes.object,
  setDataObject: PropTypes.func,
  loadData: PropTypes.func,
  saveData: PropTypes.func,
  fieldName: PropTypes.string
};

DashboardFiltersInput.defaultProps = {
  fieldName: "value"
};

export default DashboardFiltersInput;


