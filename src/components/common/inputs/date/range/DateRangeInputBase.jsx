import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DateRangePicker } from "react-date-range";
import InputContainer from "components/common/inputs/InputContainer";
import InfoContainer from "components/common/containers/InfoContainer";
import { faCalendar } from "@fortawesome/pro-light-svg-icons";
import {STATIC_DATE_RANGES} from "components/common/inputs/date/DateRangeInput";

// TODO: This should be reworked
export default function DateRangeInputBase(
  {
    model,
    setModel,
    setDataFunction,
    startDateFieldName,
    endDateFieldName,
    key,
    titleText,
  }) {
  const [internalDate, setInternalDate] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  useEffect(() => {
    const startDate = model?.getData(startDateFieldName);
    const endDate = model?.getData(endDateFieldName);

    if (startDate && endDate) {
      const unpackedInternalDate = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        key: key,
      };

      setInternalDate(unpackedInternalDate);
    }
  }, []);

  const validateAndSetData = (newStartDate, newEndDate) => {
    model.setData(startDateFieldName, newStartDate);
    model.setData(endDateFieldName, newEndDate);
    setModel({ ...model });
  };

  const updateValue = (newStartDate, newEndDate) => {
    const unpackedInternalDate = {
      startDate: new Date(newStartDate),
      endDate: new Date(newEndDate),
      key: key,
    };
    setInternalDate({...unpackedInternalDate});

    if (setDataFunction) {
      setDataFunction(newStartDate, newEndDate);
    } else {
      validateAndSetData(newStartDate, newEndDate);
    }
  };

  return (
    <InputContainer>
      <InfoContainer
        titleText={titleText}
        titleIcon={faCalendar}
      >
        <div className={"d-flex"}>
          <DateRangePicker
            startDatePlaceholder={"Start Date"}
            endDatePlaceholder={"End Date"}
            onChange={(newValue) => updateValue(newValue?.[key]?.startDate, newValue?.[key]?.endDate)}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={[internalDate]}
            staticRanges={STATIC_DATE_RANGES}
            direction={"horizontal"}
            className={"mx-auto"}
          />
        </div>
      </InfoContainer>
    </InputContainer>
  );
}

DateRangeInputBase.propTypes = {
  startDateFieldName: PropTypes.string,
  endDateFieldName: PropTypes.string,
  key: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  titleText: PropTypes.string,
};

DateRangeInputBase.defaultProps = {
  startDateFieldName: "startDate",
  endDateFieldName: "endDate",
  key: "selection",
  titleText: "Date Range",
};