import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function SuccessBanner({successMessage, removeBanner, id}) {
  const [messageBody, setMessageBody] = useState("");

  const clearSuccess = () => {
    removeBanner(id);
  };

  useEffect(() => {
    setMessageBody(successMessage);
  }, [successMessage]);

  const getCloseButton = () => {
    if (removeBanner) {
      return (
        <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearSuccess();}}/>
        </div>
      );
    }
  };

  return (
    <div className="w-100 success-block top-dialog-block">
      {getCloseButton()}
      <span>{messageBody}</span>
    </div>
  );
}

SuccessBanner.propTypes = {
  successMessage: PropTypes.string,
  removeBanner: PropTypes.func,
  id: PropTypes.string,
};

export default SuccessBanner;