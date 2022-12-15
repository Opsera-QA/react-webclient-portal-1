import React from "react";
import PropTypes from "prop-types";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import FieldContainer from "components/common/fields/FieldContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function JsonField(
  {
    dataObject,
    fieldName,
    className,
    customTitle,
  }) {
  const field = dataObject?.getFieldById(fieldName);
  const titleText = hasStringValue(customTitle) === true ? customTitle : field?.label;

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer>
      <StandaloneJsonField
        json={dataObject?.getData(fieldName)}
        titleText={titleText}
        collapsed={field?.isCollapsed}
        className={className}
      />
    </FieldContainer>
  );
}

JsonField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
  customTitle: PropTypes.string,
};