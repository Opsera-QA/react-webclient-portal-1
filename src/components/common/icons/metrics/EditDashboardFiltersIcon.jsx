import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import { faFilter } from "@fortawesome/pro-light-svg-icons";
import FiltersMultiSelectOverlay from "components/common/inputs/tags/inline/modal/FiltersMultiSelectOverlay";
import modelHelpers from "components/common/model/modelHelpers";

function EditDashboardFiltersIcon({ dashboardModel, setDashboardModel, loadData, className }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const updateDashboardFilters = async (newDataModel) => {
    let newModel = modelHelpers.setDashboardFilterModelField(dashboardModel, "amexFilters", newDataModel?.getData("amexFilters"));
    newModel = modelHelpers.setDashboardFilterModelField(dashboardModel, "tags", newDataModel?.getData("tags"));
    newModel = modelHelpers.setDashboardFilterModelField(dashboardModel, "organizations", newDataModel?.getData("organizations"));
    const response = await dashboardsActions.updateDashboardV2(getAccessToken, cancelTokenSource, newModel);
    loadData();
    return response;
  };

  const showEditor = () => {
    toastContext.showOverlayPanel(
      <FiltersMultiSelectOverlay
        dataObject={dashboardModel}
        fieldName={"amexFilters"}
        saveDataFunction={updateDashboardFilters}
        showModal={true}
      />
    );
  };

  if (dashboardModel?.canUpdateDashboardFilters() !== true) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={"Edit Dashboard Filters"}>
        <IconBase
          onClickFunction={() => {showEditor();}}
          icon={faFilter}
          className={"pointer"}
        />
      </TooltipWrapper>
    </div>
  );
}

EditDashboardFiltersIcon.propTypes = {
  dashboardModel: PropTypes.object,
  setDashboardModel: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string,
};

export default EditDashboardFiltersIcon;