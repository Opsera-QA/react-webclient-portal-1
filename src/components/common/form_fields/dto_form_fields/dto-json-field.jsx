import React, {useState} from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";

function DtoJsonField({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getJsonBody = () => {
    const json = dataObject.getData(fieldName);
    if (json && typeof json === "object") {
      return json;
    }

    return {};
  }

  return (
    <>
      <div className="my-2">
        <label className="text-muted mr-2">{field.label}:</label>
        <div className="ml-3">
          <ReactJson src={getJsonBody()} enableClipboard={false} displayDataTypes={false} collapsed={field.isCollapsed}/>
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