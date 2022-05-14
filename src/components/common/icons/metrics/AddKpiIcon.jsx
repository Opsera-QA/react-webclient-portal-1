import React from "react";
import PropTypes from "prop-types";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import {useHistory} from "react-router-dom";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function AddKpiIcon(
  {
    isLoading,
    dashboardModel,
    className,
    disabled,
    kpis,
  }) {
  const history = useHistory();

  const addRecordFunction = () => {
    history.push(`/insights/marketplace/${dashboardModel?.getData("_id")}`);
  };

  if (
    dashboardModel == null ||
    isLoading ||
    disabled === true ||
    !Array.isArray(kpis) ||
    kpis.length >= 10 ||
    dashboardModel?.canAddDashboardMetric() !== true
  ) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={"Add KPI to this Dashboard"}>
        <div>
          <IconBase
            onClickFunction={() => {addRecordFunction();}}
            icon={faPlus}
            className={"pointer"}
          />
        </div>
      </TooltipWrapper>
    </div>
  );
}

AddKpiIcon.propTypes = {
  dashboardModel: PropTypes.object,
  kpis: PropTypes.array,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default AddKpiIcon;