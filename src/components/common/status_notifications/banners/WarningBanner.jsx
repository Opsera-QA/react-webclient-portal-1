import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function WarningBanner({warningMessage, removeBanner, id}) {
  const [messageBody, setMessageBody] = useState("");

  const clearWarning = () => {
    removeBanner(id);
  };

  useEffect(() => {
    setMessageBody(warningMessage);
  }, [warningMessage]);

  const getCloseButton = () => {
    if (removeBanner) {
      return (
        <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearWarning();}}/>
        </div>
      );
    }
  };

  return (
    <div className="w-100 warning-block top-dialog-block">
      {getCloseButton()}
      <span>{messageBody}</span>
    </div>
  );
}

WarningBanner.propTypes = {
  warningMessage: PropTypes.string,
  removeBanner: PropTypes.func,
  id: PropTypes.string,
};

export default WarningBanner;