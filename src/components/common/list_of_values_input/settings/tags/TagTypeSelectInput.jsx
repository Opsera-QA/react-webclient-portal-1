import React from "react";
import PropTypes from "prop-types";
import {defaultTags} from "components/settings/tags/tags-metadata";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

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