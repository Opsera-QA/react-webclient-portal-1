import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faClipboardCheck, faClipboardList} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";

function CopyToClipboardButton(
  {
    copyString,
    size,
    className,
    showLabel,
  }) {
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
    if (showLabel === false) {
      return false;
    }

    if (copiedToClipboard) {
      return (<span className={"ml-2"}>Copied To Clipboard</span>);
    }

    return (<span className={"ml-2"}>Copy to Clipboard</span>);
  };

  return (
    <ButtonTooltip trigger={["hover", "focus"]} innerText={copiedToClipboard ? "Copied to Clipboard!" : "Copy to clipboard"}>
      <div className={className}>
        <Button size={size} variant={copiedToClipboard ? "success" : "outline-secondary"} onClick={() => {copyToClipboard();}} disabled={copyString == null}>
          <IconBase
            icon={copiedToClipboard === true ? faClipboardCheck : faClipboardList}
          />
          {getLabel()}
        </Button>
      </div>
    </ButtonTooltip>
  );
}

CopyToClipboardButton.propTypes = {
  copyString: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

CopyToClipboardButton.defaultProps = {
  size: "sm",
};

export default CopyToClipboardButton;