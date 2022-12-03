import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import axios from "axios";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function LdapOwnerFilter(
  { 
    filterModel, 
    setFilterModel, 
    setDataFunction, 
    className,
    visible,
    valueField,
  }) {
  const { getAccessToken, isSassUser } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isSassUser() === false) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getUsers(cancelSource);
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showErrorDialog(error,"Could not load users.");
        console.error(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getUsers = async (cancelSource = cancelTokenSource) => {
    const response = await accountsActions.getAccountUsersV2(getAccessToken, cancelSource);
    const parsedUsers = DataParsingHelper.parseArray(response?.data, []);

    if (isMounted.current === true) {
      setUserOptions([...parsedUsers]);
    }
  };

  const getTextField = (user) => {
    if (user) {
      return `${user.firstName} ${user.lastName} (${user.email})`;
    }

    if (isLoading) {
      return "Loading Data";
    }

    return filterModel?.getData("owner");
  };

  if (isSassUser() !== false || visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={"owner"}
        busy={isLoading}
        placeholderText={"Filter by Owner"}
        setDataObject={setFilterModel}
        dataObject={filterModel}
        textField={getTextField}
        valueField={valueField}
        selectOptions={userOptions}
        setDataFunction={setDataFunction}
      />
    </div>
  );
}

LdapOwnerFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  setDataFunction: PropTypes.func,
  visible: PropTypes.bool,
  valueField: PropTypes.string,
};

LdapOwnerFilter.defaultProps = {
  valueField: "_id",
};

export default LdapOwnerFilter;


