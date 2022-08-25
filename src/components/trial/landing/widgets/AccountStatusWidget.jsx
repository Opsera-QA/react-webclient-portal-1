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
        My Account
      </div>
    );
  };

  const getAccountStats = () => {
    return (
      <div className={"marketingModulesText"}>
        <div className={"mb-2"}>Welcome to the Opsera Salesforce Free Trial.  Your account is registered and active for the
          duration of this trial period. During this time you can create and run pipelines, review logs and learn about the
          Unified Insights available around these operations.</div>
        <div className={"my-2"}>You have 1 Pipeline configured</div>
        <div className={"my-2"}>Pipelines are healthy</div>
        <div className={"my-2"}>Your free trial will expire on 8/1/2000</div>
        <div className={"my-2"}>For questions or help, email support@opsera.io</div>
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