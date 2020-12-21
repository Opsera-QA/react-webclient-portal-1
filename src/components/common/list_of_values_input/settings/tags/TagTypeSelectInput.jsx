import React from "react";
import PropTypes from "prop-types";
import {defaultTags} from "../../../../settings/tags/tags-form-fields";
import SelectInputBase from "../../../input/SelectInputBase";

function TagTypeSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={defaultTags}
        valueField={"type"}
        textField={"value"}
        disabled={disabled}
      />
    </div>
  );
}

TagTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

TagTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default TagTypeSelectInput;