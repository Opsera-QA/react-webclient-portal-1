import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import {AuthContext} from "../../../../../../contexts/AuthContext";
import {getOrganizationAccountDropdownList} from "../../../../../admin/accounts/ldap/organizations/organization-functions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function LdapOrganizationAccountSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [ldapOrganizationAccountList, setLdapOrganizationAccountList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await getLdapOrganizationAccounts();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getLdapOrganizationAccounts = async () => {
    let ldapOrganizationAccountList = await getOrganizationAccountDropdownList("name", getAccessToken);
    setLdapOrganizationAccountList(ldapOrganizationAccountList);
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={ldapOrganizationAccountList}
        busy={isLoading}
        valueField={valueField}
        groupBy={"groupId"}
        textField={textField}
        // placeholderText={placeholderText}
        disabled={disabled || isLoading}
      />
    </div>
  );
}

LdapOrganizationAccountSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

LdapOrganizationAccountSelectInput.defaultProps = {
  valueField: "id",
  textField: "text"
};

export default LdapOrganizationAccountSelectInput;