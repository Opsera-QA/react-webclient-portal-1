import PropTypes from "prop-types";
import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faHourglassClock } from "@fortawesome/pro-light-svg-icons";
import {
  FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREEN_LINKS
} from "components/settings/trial/user_expiration/option_selection/FreeTrialUserExpirationOptionSelectionScreen";
import { useHistory } from "react-router-dom";
import SelectionIconCard from "components/common/card_containers/SelectionIconCard";
import CardIconTitleBar from "components/common/fields/title/CardIconTitleBar";

export default function FreeTrialUserExpirationExtendUserExpirationSelectionCard(
  {
    disabled,
    className,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();
  const history = useHistory();

  const onClickFunction = () => {
    history.push(FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREEN_LINKS.EXTEND_USER_EXPIRATION_SCREEN);
  };

  const getTitleBar = () => {
    return (
      <CardIconTitleBar
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
    <SelectionIconCard
      option={FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREEN_LINKS.EXTEND_USER_EXPIRATION_SCREEN}
      titleBar={getTitleBar()}
      onClickFunction={onClickFunction}
      disabled={disabled}
      className={className}
    />
  );
}

FreeTrialUserExpirationExtendUserExpirationSelectionCard.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
};