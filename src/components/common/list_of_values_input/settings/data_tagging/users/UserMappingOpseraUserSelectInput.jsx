import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import accountsActions from "components/admin/accounts/accounts-actions";

// TODO: A base component should be made for jira projects and this should be built around it
function UserMappingOpseraUserSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField,}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const [opseraUsers, setOpseraUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadOpseraUsers();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("opsera_user_id", value._id);
    newDataObject.setData("opsera_user_email", value.email);
    setDataObject({...newDataObject});
  };

  const loadOpseraUsers = async () => {

    let user = await getUserRecord();
    if (user?.ldap) {
      const response = await accountsActions.getOrganizationAccountMembers(user?.ldap?.account, getAccessToken);
      if (response.data != null && Array.isArray(response.data)) {
        setOpseraUsers(response.data);
      }
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={validateAndSetData}
      selectOptions={opseraUsers}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={"Select a user"}
      disabled={disabled || isLoading || opseraUsers.length === 0}
    />
  );
}

UserMappingOpseraUserSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

UserMappingOpseraUserSelectInput.defaultProps = {
  fieldName: "opsera_user_email",
  valueField: "_id",
  textField: "email"
};

export default UserMappingOpseraUserSelectInput;