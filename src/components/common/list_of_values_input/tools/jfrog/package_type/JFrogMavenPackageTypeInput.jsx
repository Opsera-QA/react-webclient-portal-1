import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {JFROG_ARTIFACTORY_MAVEN_PACKAGE_TYPE_SELECT_OPTIONS} from "components/common/list_of_values_input/tools/jfrog/package_type/jfrogArtificatoryMavenPackage.types";

const JFrogMavenPackageTypeInput = ({model, setModel, disabled, fieldName}) => {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={JFROG_ARTIFACTORY_MAVEN_PACKAGE_TYPE_SELECT_OPTIONS}
      valueField={"value"}
      textField={"text"}
      placeholderText={"Select Package Type"}
      disabled={disabled}
    />
  );
};

JFrogMavenPackageTypeInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,  
  fieldName: PropTypes.string,
};

export default JFrogMavenPackageTypeInput;
