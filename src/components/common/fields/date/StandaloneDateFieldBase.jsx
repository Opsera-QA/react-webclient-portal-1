import React from "react";
import PropTypes from "prop-types";
import {DATE_FORMATS, getFormattedDate} from "components/common/fields/date/DateFieldBase";

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
      {getFormattedDate(date, dateFormat)}
    </div>
  );
}

StandaloneDateFieldBase.propTypes = {
  date: PropTypes.any,
  dateFormat: PropTypes.string,
  className: PropTypes.string,
};

StandaloneDateFieldBase.defaultProps = {
  dateFormat: DATE_FORMATS.DATE,
};