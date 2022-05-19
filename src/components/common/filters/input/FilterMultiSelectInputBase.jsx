import React, { useState } from "react";
import PropTypes from "prop-types";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";

function FilterMultiSelectInputBase({ fieldName, dataObject, setDataObject, groupBy, selectOptions, setDataFunction, valueField, textField, filter, placeholderText, busy, className, inline, disabled}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  if (field == null) {
    return <WarningDialog warningMessage={"No field was found for this filter"} />;
  }

  return (
    <div className={className}>
      <InputLabel
        model={dataObject}
        field={field}
        className={"mt-1 mr-2"}
        showLabel={inline !== true}
      />
      <StandaloneMultiSelectInput
        selectOptions={selectOptions}
        valueField={valueField}
        textField={textField}
        className={inline ? `inline-filter-input inline-select-filter` : undefined}
        busy={busy}
        groupBy={groupBy}
        value={dataObject.getData(fieldName) ? [...dataObject.getData(fieldName)] : [] }
        placeholderText={placeholderText}
        disabled={disabled}
        setDataFunction={newValue => setDataFunction ? setDataFunction(field.id, newValue) : validateAndSetData(field.id, newValue)}
      />
    </div>
  );
}

FilterMultiSelectInputBase.propTypes = {
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
  disabled: PropTypes.bool
};

FilterMultiSelectInputBase.defaultProps = {
  valueField: "value",
  textField: "text",
  filter: "contains",
  placeholderText: "Select One",
  className: "my-auto"
};

export default FilterMultiSelectInputBase;