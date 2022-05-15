import React, { useState } from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

function FilterSelectInputBase(
  {
    fieldName,
    dataObject,
    setDataObject,
    groupBy,
    selectOptions,
    setDataFunction,
    valueField,
    textField,
    filter,
    placeholderText,
    busy,
    className,
    inline,
    disabled,
  }) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  const validateAndSetData = (fieldName, selectedOption) => {
    const newFilterModel = dataObject;
    newFilterModel?.setData(fieldName, selectedOption);
    setDataObject({...newFilterModel});
  };

  if (field == null) {
    console.error(`No Field was Found for ${fieldName}. Please add to the metadata if you would like it to be shown.`);
    return null;
  }

  return (
    <div className={className}>
      <InputLabel
        model={dataObject}
        showLabel={!inline}
        field={field}
        className={inline ? "mt-1 mr-2" : undefined}
      />
      <StandaloneSelectInput
        selectOptions={selectOptions}
        valueField={valueField}
        textField={textField}
        filter={filter}
        className={inline ? `inline-filter-input inline-select-filter` : undefined}
        groupBy={groupBy}
        value={dataObject?.getData(fieldName)}
        disabled={disabled || busy}
        busy={busy}
        placeholderText={placeholderText}
        setDataFunction={(data) => setDataFunction ? setDataFunction(fieldName, data) : validateAndSetData(fieldName, data)}
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
  textField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  filter: PropTypes.string,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  className: PropTypes.string,
  inline: PropTypes.bool,
  disabled: PropTypes.bool
};

FilterSelectInputBase.defaultProps = {
  valueField: "value",
  textField: "text",
  filter: "contains",
  placeholderText: "Select One",
  className: "my-auto"
};

export default FilterSelectInputBase;