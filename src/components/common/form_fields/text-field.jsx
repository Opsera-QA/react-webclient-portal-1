import React, { useState } from "react";
import PropTypes from "prop-types";

function TextField({ field, label, value }) {
  return (
    <>
      <div className="my-2">
      {field
        ?   <><div className="custom-text-input"><label className="text-muted mr-2">{field.label}:</label><span>{value}</span></div></>
      // TODO: When everything is equipped with fields, get rid of this
        :   <><div className="custom-text-input"><label className="text-muted mr-1">{label}:</label><span>{value}</span></div></>}
      </div>
    </>
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  field: PropTypes.object,
};

export default TextField;