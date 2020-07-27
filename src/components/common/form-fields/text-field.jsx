import React, { useState } from "react";
import PropTypes from "prop-types";

function TextField({ field, label, value }) {
  return (
    <>
      {field ?   <span>{field.label}{field.rules.isRequired ? <span className="danger-red">*</span> : null } </span>
      // TODO: When everything is equipped with fields, get rid of this
        :   <><span className="text-muted mr-1">{label}:</span><span>{value}</span></>}
    </>
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  field: PropTypes.object,
};

export default TextField;