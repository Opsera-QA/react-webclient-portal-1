import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";

function ConnectToToolMessage({ toolFriendlyName,}) {
  return (
    <small className={"form-text text-muted px-2"}>
      Please note: You must connect to {toolFriendlyName} in the
      <Link to="/inventory/tools"><IconBase icon={faClipboardList} className={"mx-1"}/>Tool Registry</Link> in
      order to use this feature.
    </small>
  );
}

ConnectToToolMessage.propTypes = {
  toolFriendlyName: PropTypes.string,
};

ConnectToToolMessage.defaultProps = {
  toolFriendlyName: "this Tool",
};

export default ConnectToToolMessage;
