import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faHourglassClock } from "@fortawesome/pro-light-svg-icons";
import {
  FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS
} from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagement";

export default function FreeTrialUserExpirationExtendUserExpirationSelectionCard(
  {
    currentScreen,
    setCurrentScreen,
    disabled,
    className,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  const getTitleBar = () => {
    return (
      <IconTitleBar
        className={"m-3 mb-4"}
        icon={faHourglassClock}
        iconColor={themeConstants.COLOR_PALETTE.DEEP_PURPLE}
        title={"Extend User Access"}
        subTitle={"Extend User Expiration Date"}
        iconSize={"5x"}
        titleClassName={"mx-auto mt-2"}
        subTitleClassName={"mx-auto"}
      />
    );
  };

  return (
    <SelectionIconCardBase
      selectedOption={currentScreen}
      option={FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS.EXTEND_USER_EXPIRATION_SCREEN}
      titleBar={getTitleBar()}
      onClickFunction={setCurrentScreen}
      disabled={disabled}
      className={className}
    />
  );
}

FreeTrialUserExpirationExtendUserExpirationSelectionCard.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};