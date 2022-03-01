import React, {useState} from "react";
import PropTypes from "prop-types";
import {faClipboardCheck, faClipboardList} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import IconBase from "components/common/icons/IconBase";

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
        <IconBase
          onClickFunction={() => {copyToClipboard();}}
          icon={copiedToClipboard ? faClipboardCheck : faClipboardList}
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