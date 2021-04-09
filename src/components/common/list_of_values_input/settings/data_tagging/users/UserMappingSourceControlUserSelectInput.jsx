import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import accountsActions from "components/admin/accounts/accounts-actions";
import dataMappingActions from "components/settings/data_mapping/data-mapping-actions";

function UserMappingSourceControlUserSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_id}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const [scmUsers, setScmUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tool_id !== "") {
      loadData();
    }
  }, [tool_id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadScmUsers();
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
    newDataObject.setData("tool_user_id", value.id);
    newDataObject.setData("tool_user_email", value.userName);
    setDataObject({...newDataObject});
  };

  const loadScmUsers = async () => {
    const response = await dataMappingActions.getSCMUserList(dataObject, getAccessToken);
    if (response?.data?.data && Array.isArray(response.data.data)) {
      setScmUsers(response.data.data);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={validateAndSetData}
      selectOptions={scmUsers}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={"Select a user"}
      disabled={disabled || isLoading || scmUsers.length === 0}
    />
  );
}

UserMappingSourceControlUserSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_id: PropTypes.string
};

UserMappingSourceControlUserSelectInput.defaultProps = {
  fieldName: "tool_user_id",
  valueField: "id",
  textField: "name"
};

export default UserMappingSourceControlUserSelectInput;