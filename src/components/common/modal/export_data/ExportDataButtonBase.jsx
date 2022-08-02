import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import Button from "react-bootstrap/Button";
import IconBase from "components/common/icons/IconBase";
import { faFileDownload } from "@fortawesome/pro-light-svg-icons";

function ExportDataButtonBase(
  {
    className,
    isLoading,
    launchOverlayFunction,
  }) {
  return (
    <TooltipWrapper innerText={"Export"}>
      <div className={className}>
        <Button
          variant={"outline-primary"}
          size={"sm"}
          disabled={isLoading}
          onClick={launchOverlayFunction}
        >
          <span><IconBase icon={faFileDownload} /></span>
        </Button>
      </div>
    </TooltipWrapper>
  );
}

ExportDataButtonBase.propTypes = {
  className: PropTypes.string,
  launchOverlayFunction: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ExportDataButtonBase;


