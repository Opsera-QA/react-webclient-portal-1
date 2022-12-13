import React, {useState} from "react";
import PropTypes from "prop-types";
import {faClipboardCheck, faClipboardList} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import {Button} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";

function CopyToClipboardButton(
  {
    copyString,
    className,
    copyText,
    copiedText,
    copyIcon,
    copiedIcon,
    size,
    variant,
    showLabel,
    visible,
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
    if (showLabel !== true) {
      return false;
    }

    if (copiedToClipboard) {
      return (<span className={"ml-2"}>Copied To Clipboard</span>);
    }

    return (<span className={"ml-2"}>Copy to Clipboard</span>);
  };

  if (visible === false) {
    return null;
  }

  return (
    <ButtonTooltip trigger={["hover", "focus"]} innerText={copiedToClipboard === true ? copiedText : copyText}>
      <div className={className}>
        <Button
          variant={variant}
          size={size}
          disabled={copyString == null}
          onClick={() => {copyToClipboard();}}
        >
          <IconBase
            icon={copiedToClipboard === true ? copiedIcon : copyIcon}
            iconSize={size}
            className={"pointer"}
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
  copyText: PropTypes.string,
  copiedText: PropTypes.string,
  copyIcon: PropTypes.object,
  copiedIcon: PropTypes.object,
  variant: PropTypes.string,
  showLabel: PropTypes.bool,
  visible: PropTypes.bool,
};

CopyToClipboardButton.defaultProps = {
  copyText: "Copy to clipboard",
  copiedText: "Copied to Clipboard!",
  copyIcon: faClipboardList,
  copiedIcon: faClipboardCheck,
  variant: "outline-primary",
};

export default CopyToClipboardButton;