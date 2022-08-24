import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";

export default function ActionBarBackButton({path}) {
  const history = useHistory();

  const handleBackButton = () => {
    history.push(path);
  };

  return (
    <ActionBarButton action={handleBackButton} icon={faArrowLeft} float={"left"} popoverText={"Go back"} />
  );
}

ActionBarBackButton.propTypes = {
  path: PropTypes.string,
};