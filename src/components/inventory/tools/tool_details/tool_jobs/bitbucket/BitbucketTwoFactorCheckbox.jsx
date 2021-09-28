import React, {useState} from "react";
import PropTypes from "prop-types";
import bitbucketConnectionMetadata from "./bitbucket-connection-metadata";
import InputLabel from "components/common/inputs/info_text/InputLabel";

function BitbucketTwoFactorCheckbox({dataObject, setDataObject, fieldName}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const triggerAuthenticationChange = () => {
    let newDataObject = dataObject;
    let twoFactorAuthentication = !dataObject.getData("twoFactorAuthentication");
    newDataObject.setData("twoFactorAuthentication", twoFactorAuthentication);
    newDataObject.setMetaDataFields(twoFactorAuthentication === true ? bitbucketConnectionMetadata.fieldsAlt : bitbucketConnectionMetadata.fields);
    newDataObject.setData("secretPrivateKey", "");
    newDataObject.setData("secretAccessTokenKey", "");
    newDataObject.setData("accountPassword", "");
    setDataObject({...newDataObject});
  };

  return (
    <div className="form-check mx-2">
      <input
        type="checkbox"
        name={field.id}
        checked={dataObject.getData(fieldName)}
        onChange={() => triggerAuthenticationChange()}
        className="form-check-input mr-3"
      />
      <InputLabel field={field} model={dataObject}/>
    </div>
  );
}

BitbucketTwoFactorCheckbox.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func
};

export default BitbucketTwoFactorCheckbox;