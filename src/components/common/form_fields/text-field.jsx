import React, { useState } from "react";
import PropTypes from "prop-types";

function TextField({ field, label, value }) {
  return (
    <>
      {field
        ?   <><div className="my-2"><span className="text-muted mr-2">{field.label}:</span><span>{value}</span></div></>
      // TODO: When everything is equipped with fields, get rid of this
        :   <><div className="my-2"><span className="text-muted mr-1">{label}:</span><span>{value}</span></div></>}
    </>
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  field: PropTypes.object,
};

export default TextField;