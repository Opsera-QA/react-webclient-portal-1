import React, {useState} from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";

function DtoJsonField({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  return (
    <>
      <div className="my-2">
        <label className="text-muted mr-2">{field.label}:</label>
        <div className="ml-3">
          <ReactJson src={dataObject.getData("plan")} enableClipboard={false} displayDataTypes={false}/>
        </div>
      </div>
    </>
  );
}

DtoJsonField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default DtoJsonField;