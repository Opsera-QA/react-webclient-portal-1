import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import Button from "react-bootstrap/Button";
import IconBase from "components/common/icons/IconBase";
import { faFileDownload } from "@fortawesome/pro-light-svg-icons";

function ExportDataButtonBase({
  className,
  isLoading,
  disabled,
  launchOverlayFunction,
  showExportPanel,
  buttonSize,
}) {
  const getVariant = () => {
    if (showExportPanel === true) {
      return "success";
    }

    return "secondary";
  };

  return (
    <TooltipWrapper innerText={"Export"}>
      <div className={className}>
        <Button
          variant={getVariant()}
          size={buttonSize}
          disabled={isLoading || disabled === true}
          onClick={launchOverlayFunction}
        >
          <span>
            <IconBase icon={faFileDownload} />
          </span>
        </Button>
      </div>
    </TooltipWrapper>
  );
}

ExportDataButtonBase.propTypes = {
  className: PropTypes.string,
  launchOverlayFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  showExportPanel: PropTypes.bool,
  buttonSize: PropTypes.string,
  disabled: PropTypes.bool,
};

ExportDataButtonBase.defaultProps = {
  buttonSize: "sm",
};

export default ExportDataButtonBase;
