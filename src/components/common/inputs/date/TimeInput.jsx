import React from "react";
import PropTypes from "prop-types";
import DateTimeInputBase from "components/common/inputs/date/DateTimeInputBase";

// TODO: This isn't used anywhere, so it WILL need tweaking if we want to somehow just save time without an entire date.
//  Let me know and I will adjust it. - Noah
function TimeInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <DateTimeInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      showDate={false}
      disabled={disabled}
      />
  );
}

TimeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default TimeInput;