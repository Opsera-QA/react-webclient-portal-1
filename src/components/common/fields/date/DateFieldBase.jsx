import React, {useState} from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

export const getFormattedDate = (date, dateFormat) => {
  return date && date != null && dateFormat != null ? format(new Date(date), dateFormat) : null;
};

export const getFormattedTimestamp = (date) => {
  return date != null ? format(new Date(date), "yyyy-MM-dd', 'hh:mm:ss a") : null;
};

function DateFieldBase({fieldName, dataObject, dateFormat, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field} fieldName={fieldName} /><span>
      {getFormattedDate(dataObject.getData(field.id), dateFormat)}
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
  dateFormat: "yyyy-MM-dd"
};

export default DateFieldBase;