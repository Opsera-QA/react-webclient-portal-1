import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";

function ConnectToToolMessage(
  {
    toolFriendlyName,
    className,
  }) {
  return (
    <div className={className}>
      <small className={"form-text text-muted"}>
        Please note: You must connect to {toolFriendlyName} in the
        <span  className={"mx-1"}><Link to="/inventory/tools"><IconBase icon={faClipboardList}/>Tool Registry</Link></span>
        in order to use this feature.
      </small>
    </div>
  );
}

ConnectToToolMessage.propTypes = {
  toolFriendlyName: PropTypes.string,
  className: PropTypes.string,
};

ConnectToToolMessage.defaultProps = {
  toolFriendlyName: "this Tool",
};

export default ConnectToToolMessage;
