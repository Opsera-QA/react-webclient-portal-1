import React, { useState } from "react";
import PropTypes from "prop-types";
import DateField from "../date-field";

function DtoDateField({ dataObject, fieldName }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  return (
    <>
      <div className="my-2">
        <DateField value={dataObject.getData(fieldName)} label={field.label} />
      </div>
    </>
  );
}

DtoDateField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default DtoDateField;