import React, {useState} from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import Label from "components/common/form_fields/Label";

function JsonField({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  return (
    <div className="my-2">
      <div><Label field={field}/></div>
      <div className="ml-3">
        <ReactJson src={dataObject.getData(fieldName)} enableClipboard={false} displayDataTypes={false} collapsed={field.isCollapsed}/>
      </div>
    </div>
  );
}

JsonField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default JsonField;