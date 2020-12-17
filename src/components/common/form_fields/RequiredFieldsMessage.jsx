import React from "react";

function RequiredFieldsMessage({ }) {
  return (
    <div>
      <small className="form-text text-muted text-right mr-2 mt-3"><span className="danger-red">*</span> Required Fields</small>
    </div>
  );
}

export default RequiredFieldsMessage;