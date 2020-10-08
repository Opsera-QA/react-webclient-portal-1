import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faSearchPlus} from "@fortawesome/pro-light-svg-icons";

function ActionBarShowDetailsButton({showDetails}) {

  return (
    <ActionBarButton action={showDetails} icon={faSearchPlus} popoverText={"Show Details"} />
  );
}

ActionBarShowDetailsButton.propTypes = {
  showDetails: PropTypes.func,
};

export default ActionBarShowDetailsButton;