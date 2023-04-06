import PropTypes from "prop-types";
import React from "react";
import SelectionIconCard from "components/common/card_containers/SelectionIconCard";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faUserCheck } from "@fortawesome/pro-light-svg-icons";
import {
  FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREEN_LINKS
} from "components/settings/trial/user_expiration/option_selection/FreeTrialUserExpirationOptionSelectionScreen";
import { useHistory } from "react-router-dom";
import CardIconTitleBar from "components/common/fields/title/CardIconTitleBar";

export default function FreeTrialUserExpirationReinstateUserSelectionCard(
  {
    disabled,
    className,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();
  const history = useHistory();

  const onClickFunction = () => {
    history.push(FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREEN_LINKS.REINSTATE_USER_ACCESS_SCREEN);
  };

  const getTitleBar = () => {
    return (
      <CardIconTitleBar
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
    <SelectionIconCard
      option={FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREEN_LINKS.REINSTATE_USER_ACCESS_SCREEN}
      titleBar={getTitleBar()}
      onClickFunction={onClickFunction}
      disabled={disabled}
      className={className}
    />
  );
}

FreeTrialUserExpirationReinstateUserSelectionCard.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
};