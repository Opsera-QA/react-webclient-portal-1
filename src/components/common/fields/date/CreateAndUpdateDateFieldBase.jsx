import React, {useState} from "react";
import PropTypes from "prop-types";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

function CreateAndUpdateDateFieldBase({createdAtFieldName, updatedAtFieldName, model, dateFormat, className}) {
  const [createdAtField] = useState(model?.getFieldById(createdAtFieldName));
  const [updatedAtField] = useState(model?.getFieldById(updatedAtFieldName));

  const getDate = (field) => {
    const date = model.getData(field?.id);
    return date != null && dateFormat != null ? DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(date), dateFormat) : null;
  };

  return (
    <FieldContainer className={className}>
      <div><FieldLabel field={createdAtField} fieldName={createdAtFieldName} /><span>{getDate(createdAtField)}</span></div>
      <div><FieldLabel field={updatedAtField} fieldName={updatedAtFieldName} /><span>{getDate(updatedAtField)}</span></div>
    </FieldContainer>
  );
}

CreateAndUpdateDateFieldBase.propTypes = {
  createdAtFieldName: PropTypes.string,
  updatedAtFieldName: PropTypes.string,
  model: PropTypes.object,
  dateFormat: PropTypes.string,
  className: PropTypes.string
};

CreateAndUpdateDateFieldBase.defaultProps = {
  dateFormat: "yyyy-MM-dd",
  createdAtFieldName: "createdAt",
  updatedAtFieldName: "updatedAt",
};

export default CreateAndUpdateDateFieldBase;