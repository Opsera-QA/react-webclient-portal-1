import React, {useState} from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

function JsonField({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  return (
    <FieldContainer>
      <div><FieldLabel field={field}/></div>
      <div className="ml-3">
        <ReactJson src={dataObject.getData(fieldName)} enableClipboard={false} displayDataTypes={false} collapsed={field.isCollapsed}/>
      </div>
    </FieldContainer>
  );
}

JsonField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default JsonField;