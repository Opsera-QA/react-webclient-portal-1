import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faClipboardCheck, faClipboardList} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function CopyToClipboardButton({ copyString, size, className }) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const copyToClipboard = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = copyString;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setCopiedToClipboard(true);
  };

  const getLabel = () => {
    if (copiedToClipboard) {
      return (<span><IconBase icon={faClipboardCheck} className={"mr-2"}/>Copied To Clipboard</span>);
    }

    return (<span><IconBase icon={faClipboardList} className={"mr-2"}/>Copy to Clipboard</span>);
  };

  return (
    <div className={className}>
      <Button size={size} variant={copiedToClipboard ? "success" : "outline-secondary"} onClick={() => {copyToClipboard();}} disabled={copyString == null}>
        {getLabel()}
      </Button>
    </div>
  );
}

CopyToClipboardButton.propTypes = {
  copyString: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

CopyToClipboardButton.defaultProps = {
  size: "sm",
};

export default CopyToClipboardButton;