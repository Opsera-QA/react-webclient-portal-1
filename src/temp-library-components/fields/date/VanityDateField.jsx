import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {VanityFieldLabel} from "temp-library-components/label/VanityFieldLabel";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import VanityDateFieldBase from "temp-library-components/fields/date/VanityDateFieldBase";

export default function VanityDateField(
  {
    model,
    fieldName,
    className,
    visible,
    showLabel,
    dateFormat,
  }) {
  const field = model?.getFieldById(fieldName);
  const value = DataParsingHelper.parseDate(model?.getData(fieldName));

  if (field == null || visible === false) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <VanityFieldLabel field={field} showLabel={showLabel} />
      <div>{DateFormatHelper.formatDate(value, dateFormat)}</div>
    </FieldContainer>
  );
}

VanityDateField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  showLabel: PropTypes.bool,
  dateFormat: PropTypes.string,
};

VanityDateFieldBase.defaultProps = {
  dateFormat: DateFormatHelper.DATE_FORMATS.DATE,
};
