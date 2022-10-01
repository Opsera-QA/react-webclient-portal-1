import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faUserCheck } from "@fortawesome/pro-light-svg-icons";
import {
  FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS
} from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagement";

export default function FreeTrialUserExpirationReinstateUserSelectionCard(
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
        icon={faUserCheck}
        iconColor={themeConstants.COLOR_PALETTE.GREEN}
        title={"Reinstate User Access"}
        subTitle={"Reset Revoked User Status"}
        iconSize={"5x"}
        titleClassName={"mx-auto mt-2"}
        subTitleClassName={"mx-auto"}
      />
    );
  };

  return (
    <SelectionIconCardBase
      selectedOption={currentScreen}
      option={FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS.REINSTATE_USER_ACCESS_SCREEN}
      titleBar={getTitleBar()}
      onClickFunction={setCurrentScreen}
      disabled={disabled}
      className={className}
    />
  );
}

FreeTrialUserExpirationReinstateUserSelectionCard.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};