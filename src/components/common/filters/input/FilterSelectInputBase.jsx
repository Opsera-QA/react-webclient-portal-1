import React, { useState } from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";
import WarningDialog from "components/common/status_notifications/WarningDialog";

// TODO: Rewrite when time permits
// TODO: Allow passing in error message that is displayed as the placeholderText instead of using toastContext
function FilterSelectInputBase({ fieldName, dataObject, setDataObject, groupBy, selectOptions, setDataFunction, valueField, textField, filter, placeholderText, busy, className, inline}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  if (field == null) {
    return <WarningDialog warningMessage={"No field was found for this filter"} />
  }

  return (
    <div className={className}>
      <DropdownList
        data={selectOptions}
        valueField={valueField}
        textField={textField}
        filter={filter}
        className={inline ? `inline-filter-input inline-select-filter` : undefined}
        groupBy={groupBy}
        value={dataObject?.getData(fieldName)}
        busy={busy}
        placeholder={placeholderText}
        onChange={(data) => setDataFunction ? setDataFunction(fieldName, data) : validateAndSetData(fieldName, data)}
      />
    </div>
  );
}

FilterSelectInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  selectOptions: PropTypes.array.isRequired,
  groupBy: PropTypes.string,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  filter: PropTypes.string,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  className: PropTypes.string,
  inline: PropTypes.bool,
};

FilterSelectInputBase.defaultProps = {
  valueField: "value",
  textField: "text",
  filter: "contains",
  placeholderText: "Select One",
  className: "my-auto"
}

export default FilterSelectInputBase;