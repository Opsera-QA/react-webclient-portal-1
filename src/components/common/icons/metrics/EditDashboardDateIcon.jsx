import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import { faCalendarAlt } from "@fortawesome/pro-light-svg-icons";
import modelHelpers from "components/common/model/modelHelpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import FiltersDateSelectOverlay from "../../inputs/tags/inline/modal/FiltersDateSelectOverlay";
import {metricHelpers} from "../../../insights/metric.helpers";

function EditDashboardDateIcon({ dashboardModel, setDashboardModel, loadData, className }) {
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  const updateDashboardFilters = async (newDataModel) => {
    let newModel = modelHelpers.setDashboardFilterModelField(dashboardModel, "date", newDataModel?.getData("date"));
    // update date in all kpis
    let dashboardDate = newDataModel?.getData("date");
    if(!dashboardDate) {
      dashboardDate = null;
    }
    newModel = metricHelpers.setDashboardDateToKPIs(dashboardModel, dashboardDate);
    const response = await dashboardsActions.updateDashboardV2(getAccessToken, cancelTokenSource, newModel);
    loadData();
    return response;
  };

  const showEditor = () => {
    toastContext.showOverlayPanel(
      <FiltersDateSelectOverlay
        dataModel={dashboardModel}
        saveDataFunction={updateDashboardFilters}
        showModal={true}
      />,
    );
  };

  if (dashboardModel?.canUpdateDashboardFilters() !== true) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={"Update All KPI Date Filters"}>
        <div>
          <IconBase
            onClickFunction={() => {showEditor();}}
            icon={faCalendarAlt}
            className={"pointer"}
          />
        </div>
      </TooltipWrapper>
    </div>
  );
}

EditDashboardDateIcon.propTypes = {
  dashboardModel: PropTypes.object,
  setDashboardModel: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string,
};

export default EditDashboardDateIcon;