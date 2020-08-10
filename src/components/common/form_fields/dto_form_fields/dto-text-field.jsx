import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "../text-field";

function DtoTextField({ dataObject, fieldName }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  return (
    <>
      <div className="my-2">
        <TextField value={dataObject.getData(fieldName)} label={field.label} />
      </div>
    </>
  );
}

DtoTextField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default DtoTextField;