import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardCheck, faClipboardList} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";

function SmallCopyButton({ copyString, size, className }) {
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
    <ButtonTooltip trigger={["click"]} innerText={"Copied to Clipboard!"}>
      <Button
        className={className}
        size={size}
        variant={copiedToClipboard ? "success" : "outline-secondary"}
        onClick={() => {copyToClipboard();}}
        disabled={copyString == null}>
        <FontAwesomeIcon icon={copiedToClipboard ? faClipboardCheck : faClipboardList} fixedWidth />
      </Button>
    </ButtonTooltip>
  );
}

SmallCopyButton.propTypes = {
  copyString: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string
};

SmallCopyButton.defaultProps = {
  size: "sm",
};

export default SmallCopyButton;