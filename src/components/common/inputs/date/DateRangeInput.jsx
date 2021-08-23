import React, { useState } from "react";
import PropTypes from "prop-types";
import { DateRangePicker } from "react-date-range";
import InputLabel from "components/common/inputs/info_text/InputLabel";
// import { Button } from "react-bootstrap";
import { useEffect } from "react";
import InputContainer from "components/common/inputs/InputContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { addDays, isSameDay } from "date-fns";
import InfoText from "components/common/inputs/info_text/InfoText";
// TODO: If this can't be used elsewhere, Tejas, we should change the name to be KPI Specific.
function DateRangeInput({ fieldName, dataObject, setDataObject }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const loadData = () => {
    if (dataObject.getData(fieldName)) {
      setDate({
        startDate: new Date(dataObject.getData(fieldName).startDate),
        endDate: new Date(dataObject.getData(fieldName).endDate),
        key: dataObject.getData(fieldName).key,
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
    <InputContainer>
      <div className={"d-flex justify-content-between date-range-header"}>
        <InputLabel field={field} />
        <TooltipWrapper innerText={"Clear this Value"}>
          <span onClick={() => clearCalendar()} className="my-auto badge badge-danger clear-value-badge pointer">
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1" />
            Clear Value
          </span>
        </TooltipWrapper>
      </div>
      <div style={{ width: "1150px" }}>
        <DateRangePicker
          startDatePlaceholder="Start Date"
          endDatePlaceholder="End Date"
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          selectionType="range"
          months={1}
          ranges={[date]}
          showCustomRangeLabel={true}
          staticRanges={[
            {
              label: "Today",
              range: () => ({
                startDate: new Date(),
                endDate: new Date(),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
            {
              label: "Last Week",
              range: () => ({
                startDate: addDays(new Date(), -7),
                endDate: new Date(),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
            {
              label: "Last Month",
              range: () => ({
                startDate: addDays(new Date(), -30),
                endDate: new Date(),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
            {
              label: "Last 3 Months",
              range: () => ({
                startDate: addDays(new Date(), -90),
                endDate: new Date(),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
            {
              label: "Last 6 Months",
              range: () => ({
                startDate: addDays(new Date(), -180),
                endDate: new Date(),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
            {
              label: "Last 1 Year",
              range: () => ({
                startDate: addDays(new Date(), -365),
                endDate: new Date(),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
          ]}
          onChange={(e) => dateChange(e.selection)}
          direction="horizontal"
        />
      </div>
      <InfoText field={field} errorMessage={errorMessage} />
    </InputContainer>
  );
}
DateRangeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};
export default DateRangeInput;
