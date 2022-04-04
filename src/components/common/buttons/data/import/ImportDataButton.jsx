import React, { useContext } from "react";
import PropTypes from "prop-types";
import { faFileImport } from "@fortawesome/pro-light-svg-icons";
import ButtonBase from "components/common/buttons/ButtonBase";
import { AuthContext } from "contexts/AuthContext";

function ImportDataButton(
  {
    importDataFunction,
    className,
    isLoading,
    disabled,
  }) {
  const { isOpseraAdministrator } = useContext(AuthContext);

  if (importDataFunction == null || isOpseraAdministrator() !== true) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonBase
        size={"sm"}
        variant={"outline-secondary"}
        onClickFunction={importDataFunction}
        isLoading={isLoading}
        disabled={disabled}
        icon={faFileImport}
        tooltipText={"Import Data"}
      >
    </ButtonBase>
    </div>
  );
}

ImportDataButton.propTypes = {
  importDataFunction: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ImportDataButton;