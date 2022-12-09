import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InfoContainer from "components/common/containers/InfoContainer";
import {faCalendar} from "@fortawesome/pro-light-svg-icons";
import StandaloneDateRangeInput from "components/common/inputs/date/range/StandaloneDateRangeInput";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function NewDateRangeInput(
  {
    model,
    setModel,
    setDataFunction,
    fieldName,
    key,
    titleText,
  }) {
  const field = model?.getFieldById(fieldName);
  const title = DataParsingHelper.parseString(titleText, field?.label);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const dateRange = DataParsingHelper.parseObject(model?.getData(fieldName), {});
    const unpackedStartDate = DataParsingHelper.parseDate(dateRange.startDate);
    const unpackedEndDate = DataParsingHelper.parseDate(dateRange.endDate);

    if (startDate && endDate) {
      setStartDate(unpackedStartDate);
      setEndDate(unpackedEndDate);
    }
  }, []);

  const validateAndSetData = (newDateRange) => {
    model.setData(fieldName, newDateRange);
    setModel({...model});
  };

  const updateValue = (newDateRange) => {
    setStartDate(new Date(newDateRange.startDate));
    setEndDate(new Date(newDateRange.endDate));

    const unpackedInternalDate = {
      startDate: new Date(newDateRange.startDate),
      endDate: new Date(newDateRange.endDate),
      key: key,
    };

    if (setDataFunction) {
      setDataFunction(fieldName, unpackedInternalDate);
    } else {
      validateAndSetData(unpackedInternalDate);
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer>
      <div style={{
          width: "560px",
          maxWidth: "560px",
        }}
      >
        <InfoContainer
          titleText={title}
          titleIcon={faCalendar}
          bodyClassName={"content-container-hide-overflow"}
        >
          <div className={"d-flex"}
            style={{
              width: "558px",
              maxWidth: "558px",
            }}
          >
            <StandaloneDateRangeInput
              startDate={startDate}
              endDate={endDate}
              setDataFunction={updateValue}
              key={key}
            />
          </div>
        </InfoContainer>
      </div>
    </InputContainer>
  );
}

NewDateRangeInput.propTypes = {
  fieldName: PropTypes.string,
  key: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  titleText: PropTypes.string,
};