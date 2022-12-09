import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DateRangePicker } from "react-date-range";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {addDays, isSameSecond} from "date-fns";
import InfoText from "components/common/inputs/info_text/InfoText";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";
import {getDatesFromLabel} from "../../../insights/charts/charts-helpers";

export const STATIC_DATE_RANGES = [
  {
    label: "Last 24 Hours",
    range: () => ({
      label: "Last 24 Hours",
      startDate: new Date(addDays(new Date(), -1)),
      endDate: new Date(),
    }),
    isSelected(range) {
      const definedRange = this.range();
      return (
        isSameSecond(range.startDate, definedRange.startDate) && isSameSecond(range.endDate, definedRange.endDate)
      );
    },
  },
  {
    label: "Last Week",
    range: () => ({
      label: "Last Week",
      startDate: new Date(addDays(new Date(), -7)),
      endDate: new Date(),
    }),
    isSelected(range) {
      const definedRange = this.range();
      return (
        isSameSecond(range.startDate, definedRange.startDate) && isSameSecond(range.endDate, definedRange.endDate)
      );
    },
  },
  {
    label: "Last Month",
    range: () => ({
      label: "Last Month",
      startDate: new Date(addDays(new Date(), -30)),
      endDate: new Date(),
    }),
    isSelected(range) {
      const definedRange = this.range();
      return (
        isSameSecond(range.startDate, definedRange.startDate) && isSameSecond(range.endDate, definedRange.endDate)
      );
    },
  },
  {
    label: "Last 3 Months",
    range: () => ({
      label: "Last 3 Months",
      startDate: new Date(addDays(new Date(), -90)),
      endDate: new Date(),
    }),
    isSelected(range) {
      const definedRange = this.range();
      return (
        isSameSecond(range.startDate, definedRange.startDate) && isSameSecond(range.endDate, definedRange.endDate)
      );
    },
  },
  {
    label: "Last 6 Months",
    range: () => ({
      label: "Last 6 Months",
      startDate: new Date(addDays(new Date(), -180)),
      endDate: new Date(),
    }),
    isSelected(range) {
      const definedRange = this.range();
      return (
        isSameSecond(range.startDate, definedRange.startDate) && isSameSecond(range.endDate, definedRange.endDate)
      );
    },
  },
  {
    label: "Last 1 Year",
    range: () => ({
      label: "Last 1 Year",
      startDate: new Date(addDays(new Date(), -365)),
      endDate: new Date(),
    }),
    isSelected(range) {
      const definedRange = this.range();
      return (
        isSameSecond(range.startDate, definedRange.startDate) && isSameSecond(range.endDate, definedRange.endDate)
      );
    },
  },
];

// TODO: If this can't be used elsewhere, Tejas, we should change the name to be KPI Specific.
function DateRangeInput({ fieldName, dataObject, setDataObject }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // dateObject and dataObjects are different.
    const dateObject = dataObject.getData(fieldName);
    if(dateObject?.label) {
      const date = getDatesFromLabel(dateObject?.label);
      setDate({
        label: dateObject?.label,
        startDate: new Date(date?.startDate),
        endDate: new Date(date?.endDate),
        key: dateObject?.key,
      });
    } else if (dateObject) {
      setDate({
        startDate: new Date(dateObject.startDate),
        endDate: new Date(dateObject.endDate),
        key: dateObject?.key,
      });
    }
  };

  const validateAndSetData = (value) => {
    if(value?.label){
      setDate({...getDatesFromLabel(value?.label), key: "selection"});
    } else {
      setDate(value);
    }
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
  };

  const clearCalendar = () => {
    dateChange({
      startDate: null,
      endDate: null,
      key: "selection",
    });
  };

  return (
    <InputContainer fieldName={fieldName}>
      <div className={"d-flex justify-content-between date-range-header"}>
        <InputLabel
          field={field}
          model={dataObject}
          hasError={hasStringValue(errorMessage) === true}
          clearDataFunction={clearCalendar}
        />
        <TooltipWrapper innerText={"Clear this Value"}>
          <span onClick={() => clearCalendar()} className="my-auto badge badge-danger pointer">
            <IconBase icon={faTimes} className={"mr-1"} />
            Clear Value
          </span>
        </TooltipWrapper>
      </div>
      <div style={{ width: "1150px" }}>
        <DateRangePicker
          startDatePlaceholder={"Start Date"}
          endDatePlaceholder={"End Date"}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          selectionType={"range"}
          months={1}
          ranges={[date]}
          showCustomRangeLabel={true}
          staticRanges={STATIC_DATE_RANGES}
          onChange={(e) => dateChange(e.selection)}
          direction={"horizontal"}
        />
      </div>
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

DateRangeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default DateRangeInput;
