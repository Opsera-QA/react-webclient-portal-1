import React, {useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardCheck, faClipboardList} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";

// TODO: Replace with CopyToClipboardIconBase after release
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

  if (copyString == null || copyString === "") {
    return null;
  }

  return (
    <ButtonTooltip trigger={["hover", "focus"]} innerText={copiedToClipboard ? "Copied to Clipboard!" : "Copy to clipboard"}>
      <div className={className}>
        <FontAwesomeIcon
          onClick={() => {copyToClipboard();}}
          icon={copiedToClipboard ? faClipboardCheck : faClipboardList}
          fixedWidth
          className={"pointer"}
        />
      </div>
    </ButtonTooltip>
  );
}

CopyToClipboardIcon.propTypes = {
  copyString: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string
};

export default CopyToClipboardIcon;