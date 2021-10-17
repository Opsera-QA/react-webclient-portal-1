import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import axios from "axios";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function LdapGroupMultiSelectInput({ fieldName, model, setModel, setDataFunction, disabled }) {
  const {getUserRecord, getAccessToken, setAccessRoles, isSassUser} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [field] = useState(model.getFieldById(fieldName));
  const [isLoading, setIsLoading] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const {ldap} = user;
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess && ldap?.domain != null) {
      await getGroupsByDomain(cancelSource, ldap?.domain);
    }
  };

  const getGroupsByDomain = async (cancelSource = cancelTokenSource, ldapDomain) => {
    try {
      setIsLoading(true);
      let response = await accountsActions.getLdapGroupsWithDomainV2(getAccessToken, cancelSource, ldapDomain);

      const groupResponse = response?.data;

      if (Array.isArray(groupResponse) && groupResponse.length > 0) {
        let filteredGroups = [];

        groupResponse.map((group) => {
          let groupType = group.groupType.toLowerCase();
          if (groupType !== "role" && groupType !== "dept") {
            filteredGroups.push(group);
          }
        });

        setGroupList(filteredGroups);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (field == null || isSassUser() === true) {
    return <></>;
  }

  return (
    <MultiSelectInputBase
      disabled={disabled}
      setDataFunction={setDataFunction}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={groupList}
      valueField={"name"}
      textField={"name"}
      busy={isLoading}
    />
  );
}

LdapGroupMultiSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default LdapGroupMultiSelectInput;