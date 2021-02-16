import React, { useState } from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/form_fields/input/InputLabel";
import InfoText from "components/common/form_fields/input/InfoText";
import {faStar as faStarSolid} from "@fortawesome/pro-solid-svg-icons";
import {faStar} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function FavoriteInput({fieldName, dataObject, setDataObject, disabled}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setData(field.id, value);
    setDataObject({...newDataObject});
  };

  return (
    <div className="mr-2">
        <span className="action-bar-icon">
          <FontAwesomeIcon
            size="lg"
            className={"opsera-yellow pointer"}
            icon={dataObject.getData(field.id) ? faStarSolid : faStar}
            onClick={() => {validateAndSetData(!dataObject.getData(field.id))}}
          />
        </span>
      <InfoText field={field} errorMessage={null} />
    </div>
  );
}

FavoriteInput.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object
};

export default FavoriteInput;