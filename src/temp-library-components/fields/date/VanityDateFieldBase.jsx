import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import {VanityLabelBase} from "temp-library-components/label/VanityLabelBase";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";

export default function VanityDateFieldBase(
  {
    label,
    date,
    dateFormat,
    className,
  }) {
  return (
    <FieldContainer className={className}>
      <VanityLabelBase label={label} />
      <div>{DateFormatHelper.formatDate(date, dateFormat)}</div>
    </FieldContainer>
  );
}

VanityDateFieldBase.propTypes = {
  label: PropTypes.any,
  date: PropTypes.any,
  className: PropTypes.string,
  dateFormat: PropTypes.string,
};

VanityDateFieldBase.defaultProps = {
  dateFormat: DateFormatHelper.DATE_FORMATS.DATE,
};
