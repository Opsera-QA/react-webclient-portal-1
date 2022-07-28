import React, {useState} from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

export const DATE_FORMATS = {
  DATE: "yyyy-MM-dd",
  TIMESTAMP: "yyyy-MM-dd', 'hh:mm:ss a",
};

export const getFormattedDate = (date, dateFormat) => {
  try {
    if (date === null || dateFormat == null) {
      return null;
    }

    return format(new Date(date), dateFormat);
  } catch (error) {
    return date;
  }
};

export const getFormattedTimestamp = (date) => {
  return getFormattedDate(date, DATE_FORMATS.TIMESTAMP);
};

function DateFieldBase({fieldName, dataObject, dateFormat, className}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  if (dataObject == null || field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field} fieldName={fieldName} /><span>
      {getFormattedDate(dataObject?.getData(field.id), dateFormat)}
    </span>
    </FieldContainer>
  );
}

DateFieldBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  dateFormat: PropTypes.string,
  className: PropTypes.string
};

DateFieldBase.defaultProps = {
  dateFormat: DATE_FORMATS.DATE,
};

export default DateFieldBase;