import PropTypes from "prop-types";
import React from "react";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faUserAltSlash } from "@fortawesome/pro-light-svg-icons";
import { useHistory } from "react-router-dom";
import {
  FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREEN_LINKS
} from "components/settings/trial/user_expiration/option_selection/FreeTrialUserExpirationOptionSelectionScreen";

export default function FreeTrialUserExpirationRevokeAccessSelectionCard(
  {
    disabled,
    className,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();
  const history = useHistory();

  const onClickFunction = () => {
    history.push(FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREEN_LINKS.REVOKE_USER_ACCESS_SCREEN);
  };

  const getTitleBar = () => {
    return (
      <IconTitleBar
        className={"m-3 mb-4"}
        icon={faUserAltSlash}
        iconColor={themeConstants.COLOR_PALETTE.DANGER_SECONDARY}
        title={"Revoke Access"}
        subTitle={"Remove User Login Capabilities"}
        iconSize={"5x"}
        titleClassName={"mx-auto mt-2"}
        subTitleClassName={"mx-auto"}
      />
    );
  };

  return (
    <SelectionIconCardBase
      option={FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREEN_LINKS.REVOKE_USER_ACCESS_SCREEN}
      titleBar={getTitleBar()}
      onClickFunction={onClickFunction}
      disabled={disabled}
      className={className}
    />
  );
}

FreeTrialUserExpirationRevokeAccessSelectionCard.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
};