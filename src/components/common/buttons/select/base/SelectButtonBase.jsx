import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

function SelectButtonBase({selectOption, icon, selectText, setDataFunction, className, variant}) {
  return (
    <Button
      onClick={() => setDataFunction(selectOption)}
      className={className ? className : "mb-2 small"}
      size={"sm"}
      variant={variant}
    >
      <span className="my-auto">
        <FontAwesomeIcon icon={icon} className="mr-2" fixedWidth/>
        {selectText}
      </span>
    </Button>
  );
}

SelectButtonBase.propTypes = {
  selectOption: PropTypes.object,
  icon: PropTypes.object,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.string,
  selectText: PropTypes.string,
};

export default SelectButtonBase;
