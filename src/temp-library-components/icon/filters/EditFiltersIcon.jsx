import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import { faFilter } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import EditFiltersOverlay from "temp-library-components/icon/filters/EditFiltersOverlay";

export default function EditFiltersIcon(
  {
    filterModel,
    loadDataFunction,
    filters,
    className,
  }) {
  const { toastContext, } = useComponentStateReference();

  const showEditor = () => {
    toastContext.showOverlayPanel(
      <EditFiltersOverlay
        filterModel={filterModel}
        filters={filters}
        loadDataFunction={loadDataFunction}
      />,
    );
  };

  if (filters == null || loadDataFunction == null || filterModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={"Edit Filters"}>
        <div>
          <IconBase
            onClickFunction={() => {showEditor();}}
            icon={faFilter}
            className={"pointer"}
          />
        </div>
      </TooltipWrapper>
    </div>
  );
}

EditFiltersIcon.propTypes = {
  filterModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
  className: PropTypes.string,
  filters: PropTypes.any,
};
