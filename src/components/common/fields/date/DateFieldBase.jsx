import React from "react";
import PropTypes from "prop-types";
import {format} from "date-fns";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export const DATE_FORMATS = {
  DATE: "yyyy-MM-dd",
  TIMESTAMP: "yyyy-MM-dd', 'hh:mm:ss a",
};

export const getFormattedDate = (date, dateFormat = DATE_FORMATS.DATE) => {
  try {
    const parsedDate = DataParsingHelper.parseDate(date);

    if (parsedDate === null || dateFormat == null) {
      return null;
    }

    return format(parsedDate, dateFormat);
  } catch (error) {
    return date;
  }
};

export const getFormattedTimestamp = (date) => {
  return getFormattedDate(date, DATE_FORMATS.TIMESTAMP);
};

function DateFieldBase(
  {
    fieldName,
    dataObject,
    dateFormat,
    className,
    requireSavedValue,
  }) {
  const field = dataObject?.getFieldById(fieldName);

  if (
    dataObject == null
    || field == null
    || (requireSavedValue === true && DataParsingHelper.parseDate(dataObject?.getData(fieldName)) === false)
  ) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field} fieldName={fieldName}/><span>
      {getFormattedDate(dataObject?.getData(field.id), dateFormat)}
    </span>
    </FieldContainer>
  );
}

DateFieldBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  dateFormat: PropTypes.string,
  className: PropTypes.string,
  requireSavedValue: PropTypes.bool,
};

DateFieldBase.defaultProps = {
  dateFormat: DATE_FORMATS.DATE,
};

export default DateFieldBase;