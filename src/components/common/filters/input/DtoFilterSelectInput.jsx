import React, { useState } from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";
import WarningDialog from "../../status_notifications/WarningDialog";

// TODO: Rewrite when time permits
function DtoFilterSelectInput({ fieldName, dataObject, setDataObject, groupBy, selectOptions, setDataFunction, valueField, textField, filter, placeholderText, busy}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  if (field == null) {
    return <WarningDialog warningMessage={"No field was found for this filter"} />
  }

  return (
    <div className="my-auto">
      {/*<label><span>{field.label}</span></label>*/}
      <DropdownList
        data={selectOptions}
        valueField={valueField}
        textField={textField}
        filter={filter}
        groupBy={groupBy}
        value={dataObject.getData(fieldName)}
        busy={busy}
        placeholder={placeholderText}
        onChange={(data) => setDataFunction ? setDataFunction(fieldName, data) : validateAndSetData(fieldName, data)}
      />
    </div>
  );
}

DtoFilterSelectInput.propTypes = {
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
  busy: PropTypes.bool
};

DtoFilterSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  filter: "contains",
  placeholderText: "Select One"
}

export default DtoFilterSelectInput;