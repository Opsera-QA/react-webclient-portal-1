import React from "react";
import PropTypes from "prop-types";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import VanityDateField from "temp-library-components/fields/date/VanityDateField";

export default function VanityDateTimeField(
  {
    model,
    fieldName,
    className,
    visible,
    showLabel,
  }) {
  return (
    <VanityDateField
      model={model}
      className={className}
      fieldName={fieldName}
      showLabel={showLabel}
      dateFormat={DateFormatHelper.DATE_FORMATS.TIMESTAMP_WITHOUT_SECONDS}
      visible={visible}
    />
  );
}

VanityDateTimeField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  showLabel: PropTypes.bool,
  dateFormat: PropTypes.string,
};

VanityDateTimeField.defaultProps = {
  dateFormat: DateFormatHelper.DATE_FORMATS.DATE,
};
