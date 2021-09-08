import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function MongodbRealmToolInput({className, fieldName, model, setModel, disabled}) {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("mongoToolId", selectedOption?._id);    
    setModel({...newModel});
  };

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
       fields={["id", "configuration", "name"]}
     />
  );
}

MongodbRealmToolInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string
};

MongodbRealmToolInput.defaultProps = {
  fieldName: "mongoToolId",
};

export default MongodbRealmToolInput;
