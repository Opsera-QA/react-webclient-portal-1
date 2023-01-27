import React from "react";
import PropTypes from "prop-types";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";

export default function StandaloneDateFieldBase(
  {
    date,
    dateFormat,
    className,
  }) {
  if (date == null) {
    return null;
  }

  return (
    <div className={className}>
      {DateFormatHelper.formatDate(date, dateFormat)}
    </div>
  );
}

StandaloneDateFieldBase.propTypes = {
  date: PropTypes.any,
  dateFormat: PropTypes.string,
  className: PropTypes.string,
};

StandaloneDateFieldBase.defaultProps = {
  dateFormat: DateFormatHelper.DATE_FORMATS.DATE,
};