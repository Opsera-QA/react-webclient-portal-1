import React from "react";
import PropTypes from "prop-types";
import { faDownload } from "@fortawesome/pro-light-svg-icons";
import { cannotBeUndone } from "components/common/tooltip/popover-text";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function ExportJsonButton(
  {
    json,
    icon,
    fileName,
    disabled,
    className,
    normalText,
    buttonSize,
  }) {
  const exportJson = () => {
    const stringifiedJson = JSON.stringify(json, null, 2);
    const blob = new Blob([stringifiedJson], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  if ((json == null || hasStringValue(fileName) !== true) && disabled !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      className={className}
      icon={icon}
      disabled={disabled}
      onClickFunction={exportJson}
      tooltip={cannotBeUndone}
      variant={"secondary"}
      normalText={normalText}
      buttonSize={buttonSize}
    />
  );
}

ExportJsonButton.propTypes = {
  fileName: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  json: PropTypes.any,
  icon: PropTypes.object,
  normalText: PropTypes.string,
  buttonSize: PropTypes.string,
};

ExportJsonButton.defaultProps = {
  icon: faDownload,
  normalText: "Export JSON",
};