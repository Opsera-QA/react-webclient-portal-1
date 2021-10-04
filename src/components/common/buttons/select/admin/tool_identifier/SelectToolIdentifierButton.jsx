import React from "react";
import PropTypes from "prop-types";
import SelectButtonBase from "components/common/buttons/select/base/SelectButtonBase";
import {faTools} from "@fortawesome/pro-light-svg-icons";

function SelectToolIdentifierButton({toolIdentifier, setDataFunction, className}) {
  return (
    <SelectButtonBase
      className={className}
      setDataFunction={setDataFunction}
      selectOption={toolIdentifier}
      icon={faTools}
      selectText={"Select Tool"}
      variant={"primary"}
    />
  );
}

SelectToolIdentifierButton.propTypes = {
  toolIdentifier: PropTypes.object,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
};

export default SelectToolIdentifierButton;
