import React, {useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardCheck, faClipboardList} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";

function CopyToClipboardIcon({ copyString, className }) {
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
    <ButtonTooltip trigger={["hover"]} innerText={copiedToClipboard ? "Copied to Clipboard!" : "Copy to clipboard"}>
      <FontAwesomeIcon
        onClick={() => {copyToClipboard()}}
        icon={copiedToClipboard ? faClipboardCheck : faClipboardList}
        fixedWidth
        className={className}
      />
    </ButtonTooltip>
  );
}

CopyToClipboardIcon.propTypes = {
  copyString: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string
};

export default CopyToClipboardIcon;