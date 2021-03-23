import React, {useState} from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

function JsonField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getJsonBody = () => {
    const json = dataObject.getData(fieldName);
    if (json && typeof json === "object") {
      return json;
    }

    return {};
  };

  return (
    <FieldContainer className={className}>
      <div><FieldLabel field={field}/></div>
      <div className="ml-3">
        <ReactJson src={getJsonBody()} enableClipboard={false} displayDataTypes={false} collapsed={field.isCollapsed}/>
      </div>
    </FieldContainer>
  );
}

JsonField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default JsonField;