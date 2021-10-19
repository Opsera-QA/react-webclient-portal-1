import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import accountsActions from "components/admin/accounts/accounts-actions";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import InputContainer from "components/common/inputs/InputContainer";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

function LdapOpseraUserSelectInputBase({ dataObject, setDataObject, setDataFunction}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [opseraUserList, setOpseraUsersList] = useState([]);
  const [currentOpseraUser, setCurrentOpseraUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
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
    try {
      setIsLoading(true);
      await loadOpseraUsers(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadOpseraUsers = async (cancelSource = cancelTokenSource) => {
    const response = await accountsActions.getUsers(getAccessToken, cancelSource);
    const users = response?.data?.data;
    let parsedUserNames = [];

    if (isMounted?.current === true && Array.isArray(users) && users.length > 0) {
      users.map(user => {
        let orgDomain = user.email.substring(user.email.lastIndexOf("@") + 1);
        if (dataObject.isNew() || dataObject["orgDomain"].includes(orgDomain)) {
          if (dataObject.getData("orgOwnerEmail") != null) {
            if (user["email"] === dataObject.getData("orgOwnerEmail")) {
              setCurrentOpseraUser({
                text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"],
                id: user
              });
            }
          }
          parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
        }
      });
    }

    if (isMounted?.current === true) {
      setOpseraUsersList(parsedUserNames);
    }
  };

  const handleOpseraUserChange = (selectedOption) => {
    let option = selectedOption.id;
    setCurrentOpseraUser(option);
    setDataFunction(option);
  };

  return (
    <InputContainer>
      <label className="mt-0"><span>Opsera Customer Record<span className="danger-red">*</span></span></label>
      <StandaloneSelectInput
        selectOptions={opseraUserList}
        valueField={"value"}
        textField={"text"}
        busy={isLoading}
        groupBy={user => capitalizeFirstLetter(user.id.organizationName, "-", "No Organization Name")}
        defaultValue={currentOpseraUser}
        setDataFunction={handleOpseraUserChange}
      />
    </InputContainer>
  );
}

LdapOpseraUserSelectInputBase.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func
};

export default LdapOpseraUserSelectInputBase;