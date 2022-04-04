import React, { useContext } from "react";
import PropTypes from "prop-types";
import { faFileExport, } from "@fortawesome/pro-light-svg-icons";
import ButtonBase from "components/common/buttons/ButtonBase";
import { AuthContext } from "contexts/AuthContext";

function ExportDataButton(
  {
    exportDataFunction,
    className,
    isLoading,
    disabled,
  }) {
  const { isOpseraAdministrator } = useContext(AuthContext);

  if (exportDataFunction == null || isOpseraAdministrator() !== true) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonBase
        size={"sm"}
        variant={"outline-secondary"}
        onClickFunction={exportDataFunction}
        isLoading={isLoading}
        disabled={disabled}
        icon={faFileExport}
        tooltipText={"Export Data"}
      >
    </ButtonBase>
    </div>
  );
}

ExportDataButton.propTypes = {
  exportDataFunction: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ExportDataButton;