import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {Timepicker} from "@opsera/dhx-suite-package";

// TODO: Utilize Opsera colors
function TimeInputBase({ data, disabled, setDataFunction }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const timepicker = setUpTimepicker();

    return () => {
      timepicker.destructor();
    };
  }, [disabled]);

  const setUpTimepicker = () => {
    let timepicker = new Timepicker(containerRef.current, {
      value: new Date(data)
    });

    if (disabled) {
      timepicker.disable();
    }
    else {
      timepicker.events.on("Change", (value) => {
        setDataFunction(value);
      });
    }

    return timepicker;
  };

  return (<div className={"w-100"} id="timePicker" ref={el => (containerRef.current = el)}/>);
}

TimeInputBase.propTypes = {
  data: PropTypes.any,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func
};

export default TimeInputBase;