import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import FieldContainer from "components/common/fields/FieldContainer";

function StandaloneJsonField({model, label, fieldName, className, collapsed}) {
  const getJsonBody = () => {
    const json = model.getData(fieldName);
    if (json && typeof json === "object") {
      return json;
    }

    return {};
  };

  return (
    <FieldContainer className={className}>
      <div><label className="mb-2 mr-2 text-muted"><span>{label}:</span></label></div>
      <div className="ml-3">
        <ReactJson src={getJsonBody()} enableClipboard={false} displayDataTypes={false} collapsed={collapsed}/>
      </div>
    </FieldContainer>
  );
}

StandaloneJsonField.propTypes = {
  fieldName: PropTypes.string,
  label: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  collapsed: PropTypes.bool
};

export default StandaloneJsonField;