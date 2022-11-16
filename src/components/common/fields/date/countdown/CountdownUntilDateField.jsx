import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import CountdownUntilDateFieldBase from "components/common/fields/date/countdown/CountdownUntilDateFieldBase";
import StandaloneDateFieldBase from "components/common/fields/date/StandaloneDateFieldBase";
import IconBase from "components/common/icons/IconBase";
import {faClock} from "@fortawesome/pro-light-svg-icons";

export default function CountdownUntilDateField(
  {
    model,
    fieldName,
    className,
    includeDate,
  }) {
  const field = model?.getFieldById(fieldName);

  const getBody = () => {
    if (includeDate === true) {
      return (
        <>
          <StandaloneDateFieldBase date={model?.getData(fieldName)} className={"mr-2"} />
          <IconBase
            icon={faClock}
            className={"mr-2"}
          />
          <CountdownUntilDateFieldBase
            date={model?.getData(fieldName)}
          />
        </>
      );
    }

    return (
      <CountdownUntilDateFieldBase
        date={model?.getData(fieldName)}
      />
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className={"d-flex w-100 no-wrap-inline"}>
        <FieldLabel
          fieldName={fieldName}
          field={field}
        />
        {getBody()}
      </div>
    </FieldContainer>
  );
}

CountdownUntilDateField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  includeDate: PropTypes.bool,
};