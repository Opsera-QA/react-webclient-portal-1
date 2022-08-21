import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";

// TODO: Standardize
export default function AccountStatusWidget({ className }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  const getTitleText = () => {
    return (
      <div
        style={{
          // fontWeight: 700,
          // fontSize: "22px",
        }}
      >
        Account Status
      </div>
    );
  };

  const getAccountStats = () => {
    return (
      <div
        style={{
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        <div>X Pipelines</div>
        <div>Pipeline Status</div>
        <div>X Days left in Free Trial</div>
        <div>Other Account Level Stats</div>
      </div>
    );
  };

  return (
    <div className={className}>
      <FreeTrialWidgetDataBlockBase
        title={getTitleText()}
        titleIcon={faClipboardList}
        fontColor={themeConstants.COLOR_PALETTE.DEEP_PURPLE}
        heightSize={6}
      >
        <div className={"p-3"}>
          <div>
            {getAccountStats()}
          </div>
        </div>
      </FreeTrialWidgetDataBlockBase>
    </div>
  );
}

AccountStatusWidget.propTypes = {
  className: PropTypes.string,
};