import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import accountsActions from "components/admin/accounts/accounts-actions";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function LdapOwnerFilter(
  { 
    filterModel, 
    setFilterModel, 
    setDataFunction,
    clearDataFunction,
    className,
    visible,
    valueField,
    fieldName,
    placeholderText,
    inline,
    showLabel,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [ldapUsers, setLdapUsers] = useState([]);
  const {
    toastContext,
    getAccessToken,
    isSaasUser,
    isMounted,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    if (isSaasUser === false) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getUsers();
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showErrorDialog(error,"Could not load users.");
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getUsers = async () => {
    const response = await accountsActions.getAccountUsersV2(getAccessToken, cancelTokenSource);
    const parsedUsers = DataParsingHelper.parseArray(response?.data, []);

    if (isMounted.current === true) {
      setLdapUsers([...parsedUsers]);
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

  if (isSaasUser !== false || visible === false) {
    return null;
  }


  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={fieldName}
        busy={isLoading}
        placeholderText={placeholderText}
        clearDataFunction={clearDataFunction}
        setDataObject={setFilterModel}
        dataObject={filterModel}
        textField={getTextField}
        valueField={valueField}
        selectOptions={ldapUsers}
        setDataFunction={setDataFunction}
        inline={inline}
        showLabel={showLabel}
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
  fieldName: PropTypes.string,
  placeholderText: PropTypes.string,
  inline: PropTypes.bool,
  showLabel: PropTypes.bool,
  clearDataFunction: PropTypes.func,
};

LdapOwnerFilter.defaultProps = {
  valueField: "_id",
  fieldName: "owner",
  placeholderText: "Filter by Owner",
};

export default LdapOwnerFilter;


