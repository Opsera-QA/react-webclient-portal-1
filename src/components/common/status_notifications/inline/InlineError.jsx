import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {parseError} from "components/common/helpers/error-helpers";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function InlineError({ error, prependMessage, removeInlineMessage }) {
  const [messageBody, setMessageBody] = useState(undefined);

  useEffect(() => {
    const messageBody = parseError(error);
    setMessageBody(messageBody);
  }, [error]);

  const getCloseButton = () => {
    if (removeInlineMessage) {
      return (
        <div className="float-right mr-1">
          <IconBase icon={faTimes} className={"pointer"} onClickFunction={() => {removeInlineMessage();}}/>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="error-block">
      <div className="p-2">
        {getCloseButton()}
        {prependMessage} {messageBody}
      </div>
    </div>
  );
}

InlineError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  prependMessage: PropTypes.string,
  removeInlineMessage: PropTypes.func
};

export default InlineError;
