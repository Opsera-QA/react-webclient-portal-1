import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faArrowLeft} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function ActionBarBackButton(
  {
    path,
    className,
  }) {
  const history = useHistory();
  const {
    isOpseraAdministrator,
    isFreeTrial,
  } = useComponentStateReference();

  const handleBackButton = () => {
    if ((isOpseraAdministrator !== true && isFreeTrial === true) || hasStringValue(path) !== true) {
      history.goBack();
      return;
    }

    history.push(path);
  };

  return (
    <ActionBarButton
      className={className}
      action={handleBackButton}
      icon={faArrowLeft}
      float={"left"}
      popoverText={"Go back"}
    />
  );
}

ActionBarBackButton.propTypes = {
  path: PropTypes.string,
  className: PropTypes.string,
};