import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {Combobox} from "@opsera/dhx-suite-package";

function VanityComboBoxInputBase({ currentValue, groupBy, selectOptions, placeholderText, busy, disabled, updateValue, multiselect}) {
  const containerRef = useRef(null);

  useEffect(() => {
    let comboBox = setUpComboBox();

    return (
      comboBox.destructor()
    );
  }, [selectOptions, busy, disabled]);

  const setUpComboBox = () => {
    let comboBox = new Combobox(containerRef.current, {
      data: selectOptions,
      placeholder: busy ? "Loading Data" : placeholderText,
      value: currentValue,
      multiselect: multiselect,
      itemsCount: multiselect === true
    });

    if (disabled || busy) {
      comboBox.disable();
    }
    else {
      comboBox.events.on("Change", (value) => {
        updateValue(comboBox.getValue(value));
      });
    }

    return comboBox;
  };

  return (
    <div className={"w-100"} id="select-input" ref={el => (containerRef.current = el)}/>
  );
}

VanityComboBoxInputBase.propTypes = {
  currentValue: PropTypes.any,
  updateValue: PropTypes.func,
  selectOptions: PropTypes.array,
  groupBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  placeholderText: PropTypes.string,
  busy: PropTypes.bool,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  multiselect: PropTypes.bool
};

VanityComboBoxInputBase.defaultProps = {
  placeholderText: "Select One"
};

export default VanityComboBoxInputBase;