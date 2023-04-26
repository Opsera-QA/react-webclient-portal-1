import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import { faFilter } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function EditFiltersIcon(
  {
    filterModel,
    filterOverlay,
    className,
    isLoading,
  }) {
  const { toastContext, } = useComponentStateReference();

  const showEditFilterOverlay = () => {
    toastContext.showOverlayPanel(filterOverlay);
  };

  if (filterOverlay == null || filterModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={"Edit Filters"}>
        <div>
          <IconBase
            onClickFunction={showEditFilterOverlay}
            icon={faFilter}
            disabled={isLoading}
          />
        </div>
      </TooltipWrapper>
    </div>
  );
}

EditFiltersIcon.propTypes = {
  filterModel: PropTypes.object,
  className: PropTypes.string,
  filterOverlay: PropTypes.any,
  isLoading: PropTypes.bool,
};
