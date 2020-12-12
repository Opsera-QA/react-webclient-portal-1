import React, {useState} from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import Label from "./Label";

function DateFieldBase({fieldName, dataObject, dateFormat}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getDate = () => {
    const date = dataObject.getData(field.id);

    return date != null && dateFormat != null ? format(new Date(date), dateFormat) : null;
  };

  return (<div><Label field={field} /><span>{getDate()}</span></div>);
}

DateFieldBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  dateFormat: PropTypes.string
};

DateFieldBase.defaultProps = {
  dateFormat: "yyyy-MM-dd"
}

export default DateFieldBase;