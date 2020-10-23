import React  from "react";
import PropTypes from "prop-types";
import {faToggleOff, faToggleOn} from "@fortawesome/pro-light-svg-icons";
import ActionBarField from "./ActionBarField";

function ActionBarStatus({status}) {

  return (
    <ActionBarField
      iconClasses={"mr-2" + (status ? " opsera-blue" : " dark-grey")}
      icon={status ? faToggleOn : faToggleOff}
      popoverText={`Current Status`}
      text={status ? "Active" : "Inactive"}
    />
  );
}

ActionBarStatus.propTypes = {
  handleActiveToggle: PropTypes.func,
  status: PropTypes.string
};

export default ActionBarStatus;