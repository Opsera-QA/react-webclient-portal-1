import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ActionBarBackButton({path}) {
  const history = useHistory();
  const { isOpseraAdministrator } = useComponentStateReference();

  const handleBackButton = () => {
    history.push(path);
  };

  // This is hidden on free trial for users besides opsera administrators
  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ActionBarButton
      action={handleBackButton}
      icon={faArrowLeft}
      float={"left"}
      popoverText={"Go back"}
    />
  );
}

ActionBarBackButton.propTypes = {
  path: PropTypes.string,
};