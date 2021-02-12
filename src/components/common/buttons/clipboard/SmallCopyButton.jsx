import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardList, faClipboardListCheck} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";

function SmallCopyButton({ copyString, size }) {
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
        size={size}
        variant={copiedToClipboard ? "success" : "outline-secondary"}
        onClick={() => {copyToClipboard()}}
        disabled={copyString == null}>
        <FontAwesomeIcon icon={copiedToClipboard ? faClipboardListCheck : faClipboardList} fixedWidth />
      </Button>
    </ButtonTooltip>
  );
}

SmallCopyButton.propTypes = {
  copyString: PropTypes.string,
  size: "sm"
};

export default SmallCopyButton;