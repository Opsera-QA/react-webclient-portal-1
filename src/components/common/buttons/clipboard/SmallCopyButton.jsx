import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faClipboardCheck, faClipboardList} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import IconBase from "components/common/icons/IconBase";

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
        <IconBase icon={copiedToClipboard ? faClipboardCheck : faClipboardList} />
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