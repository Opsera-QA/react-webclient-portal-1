import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

// TODO: Use React JSX standards for file name in separate merge request
function InformationDialog ({ message, setInformationMessage, alignment }) {
  const [messageBody, setMessageBody] = useState(undefined);

  useEffect(() => {
    setMessageBody(message);
  }, [message]);

  const clearInformationMessage = () => {
      setInformationMessage(() => {
        return false;
      });
  };

  if (alignment === "dialogToast") {
    return (
      <div className="w-100 info-block top-dialog-block">
        {setInformationMessage && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearInformationMessage();}}/>
        </div>}
        <span>{messageBody}</span>
      </div>
    );
  }

  if (alignment === "top") {
    return (
      <div className="w-100 info-block top-error-block">
        {setInformationMessage && <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearInformationMessage();}}/>
        </div>}
        {messageBody}
      </div>
    );
  }

  return (
    <div className="mt-1 mb-3">
      <div className="info-text p-1">
        {messageBody}
      </div>
    </div>
  );
}

InformationDialog.propTypes = {
  message: PropTypes.string,
  setInformationMessage: PropTypes.func,
  alignment: PropTypes.string,
};

export default InformationDialog;