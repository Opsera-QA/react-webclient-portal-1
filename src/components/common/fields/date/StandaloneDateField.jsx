import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import StandaloneDateFieldBase from "components/common/fields/date/StandaloneDateFieldBase";

export default function StandaloneDateField(
  {
    label,
    date,
    className,
    dateFormat,
    infoMessage,
    errorMessage,
    visible,
  }) {
  if (visible === false) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className={"w-100 d-flex"}>
        <FieldLabelBase
          label={label}
          // isLoading={isBusy}
        />
        <StandaloneDateFieldBase
          date={date}
          dateFormat={dateFormat}
        />
      </div>
      <InfoText
        infoMessage={infoMessage}
        errorMessage={errorMessage}
      />
    </FieldContainer>
  );
}

StandaloneDateField.propTypes = {
  date: PropTypes.any,
  label: PropTypes.string,
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  infoMessage: PropTypes.string,
  errorMessage: PropTypes.func,
  visible: PropTypes.bool,
};
