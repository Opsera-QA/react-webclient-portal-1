import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function InformationBanner ({ informationMessage, removeBanner, id }) {
  const [messageBody, setMessageBody] = useState(undefined);

  useEffect(() => {
    setMessageBody(informationMessage);
  }, [informationMessage]);

  const clearInformationMessage = () => {
    removeBanner(id);
  };

  const getCloseButton = () => {
    if (removeBanner) {
      return (
        <div className="float-right ml-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {clearInformationMessage();}}/>
        </div>
      );
    }
  };

    return (
      <div className="w-100 info-block top-dialog-block">
        {getCloseButton()}
        <span>{messageBody}</span>
      </div>
    );
}

InformationBanner.propTypes = {
  informationMessage: PropTypes.string,
  removeBanner: PropTypes.func,
  id: PropTypes.string,
};

export default InformationBanner;