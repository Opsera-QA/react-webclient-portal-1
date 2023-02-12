import React from "react";
import PropTypes from "prop-types";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";

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
      {DateFormatHelper.formatDate(dataObject?.getData(field.id), dateFormat)}
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
  dateFormat: DateFormatHelper.DATE_FORMATS.DATE,
};

export default DateFieldBase;