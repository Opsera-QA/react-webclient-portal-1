import React, { useState } from "react";
import PropTypes from "prop-types";
import { DateRange } from "react-date-range";
import InputLabel from "../form_fields/input/InputLabel";
import InfoText from "../form_fields/input/InfoText";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

// TODO: If this can't be used elsewhere, Tejas, we should change the name to be KPI Specific.
// TODO: This also needs to be moved to the /common/inputs folder.
//  This houses the newest components, legacy ones are in /common/input until I can migrate everywhere to the new ones.
function DateRangeInput({ fieldName, dataObject, setDataObject }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const loadData = () => {
    if (dataObject.getData("value")) {
      setDate({
        startDate: new Date(dataObject.getData("value").startDate),
        endDate: new Date(dataObject.getData("value").endDate),
        key: dataObject.getData("value").key,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    if (value.startDate === null && value.endDate === null) {
      value = null;
    }
    newDataObject.setData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({ ...newDataObject });
  };

  const dateChange = (item) => {
    validateAndSetData(item);
    setDate(item);
  };

  const clearCalendar = () => {
    dateChange({
      startDate: null,
      endDate: null,
      key: "selection",
    });
  };

  return (
    <div className="form-group m-2 max-content-width">
      <div>
        <InputLabel field={field} />
      </div>
      <DateRange
        startDatePlaceholder="Start Date"
        endDatePlaceholder="End Date"
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        selectionType="range"
        months={1}
        ranges={[date]}
        onChange={(e) => dateChange(e.selection)}
        direction="horizontal"
      />
      <Button
        className="ml-3"
        variant="outline-secondary"
        size="sm"
        type="button"
        style={{ marginRight: "auto" }}
        onClick={clearCalendar}
      >
        Clear
      </Button>
      <InfoText field={field} errorMessage={errorMessage} />
    </div>
  );
}

DateRangeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default DateRangeInput;
