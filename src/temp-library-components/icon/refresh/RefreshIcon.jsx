import React from "react";
import PropTypes from "prop-types";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

export default function RefreshIcon(
  {
    isLoading,
    loadDataFunction,
    className,
  }) {
  if (loadDataFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={"Reload Data"}>
        <div>
          <IconBase
            onClickFunction={isLoading === true ? undefined : () => loadDataFunction()}
            icon={faSync}
            spinIcon={isLoading}
          />
        </div>
      </TooltipWrapper>
    </div>
  );
}

RefreshIcon.propTypes = {
  loadDataFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};
