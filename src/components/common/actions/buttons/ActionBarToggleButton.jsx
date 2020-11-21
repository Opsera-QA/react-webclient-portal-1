import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faToggleOff, faToggleOn} from "@fortawesome/pro-light-svg-icons";

function ActionBarToggleButton({handleActiveToggle, status}) {

  const toggleStatus = () => {
    handleActiveToggle();
  }

  return (
    <ActionBarButton
      action={toggleStatus}
      iconClasses={"mr-2" + (status ? " opsera-blue" : " dark-grey")}
      icon={status ? faToggleOn : faToggleOff}
      popoverText={`Toggle Current Status`}
      text={status ? "Active" : "Inactive"}
    />
  );
}

ActionBarToggleButton.propTypes = {
  handleActiveToggle: PropTypes.func,
  status: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.bool]
  )
};

export default ActionBarToggleButton;