import React, {useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardCheck, faClipboardList} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import {Button} from "react-bootstrap";

function CopyToClipboardButton({ copyString, className, copyText, copiedText, copyIcon, copiedIcon, size, variant }) {
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

  return (
    <ButtonTooltip trigger={["hover", "focus"]} innerText={copiedToClipboard === true ? copiedText : copyText}>
      <div className={className}>
        <Button
          variant={variant}
          size={size}
          disabled={typeof copyString !== "string" || copyString.length === 0}
          onClick={() => {copyToClipboard();}}
        >
          <FontAwesomeIcon
            icon={copiedToClipboard === true ? copiedIcon : copyIcon}
            size={size}
            fixedWidth
            className={"pointer"}
          />
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
};

CopyToClipboardButton.defaultProps = {
  copyText: "Copy to clipboard",
  copiedText: "Copied to Clipboard!",
  copyIcon: faClipboardList,
  copiedIcon: faClipboardCheck,
  variant: "outline-primary",
};

export default CopyToClipboardButton;