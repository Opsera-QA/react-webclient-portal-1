import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedMongoDbRealmToolSelectInput({className, fieldName, model, setModel, setDataFunction, disabled}) {
  return (
     <RoleRestrictedToolByIdentifierInputBase
       toolIdentifier={"mongodb_realm"}
       toolFriendlyName={"MongoDB Realm"}
       fieldName={fieldName}
       placeholderText={"Select MongoDB Realm Tool"}
       configurationRequired={true}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
       className={className}
       // fields={["_id", "configuration", "name"]}
     />
  );
}

RoleRestrictedMongoDbRealmToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
};

RoleRestrictedMongoDbRealmToolSelectInput.defaultProps = {
  fieldName: "mongoToolId",
};

export default RoleRestrictedMongoDbRealmToolSelectInput;
