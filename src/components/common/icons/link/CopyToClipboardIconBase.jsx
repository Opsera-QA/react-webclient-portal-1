import React, {useState} from "react";
import PropTypes from "prop-types";
import {faClipboardCheck, faClipboardList} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import IconBase from "components/common/icons/IconBase";

function CopyToClipboardIconBase({ copyString, className, copyText, copiedText, copyIcon, copiedIcon, size }) {
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
    <ButtonTooltip trigger={["hover", "focus"]} innerText={copiedToClipboard === true ? copiedText : copyText}>
      <div className={className}>
        <IconBase
          onClickFunction={() => {copyToClipboard();}}
          icon={copiedToClipboard === true ? copiedIcon : copyIcon}
          iconSize={size}
          className={"pointer"}
        />
      </div>
    </ButtonTooltip>
  );
}

CopyToClipboardIconBase.propTypes = {
  copyString: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  copyText: PropTypes.string,
  copiedText: PropTypes.string,
  copyIcon: PropTypes.object,
  copiedIcon: PropTypes.object,
};

CopyToClipboardIconBase.defaultProps = {
  copyText: "Copy to clipboard",
  copiedText: "Copied to Clipboard!",
  copyIcon: faClipboardList,
  copiedIcon: faClipboardCheck
};

export default CopyToClipboardIconBase;