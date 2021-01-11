import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import accountsActions from "components/admin/accounts/accounts-actions";
import DropdownList from "react-widgets/lib/DropdownList";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";

function LdapOrganizationAccountOpseraUserSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [opseraUserList, setOpseraUsersList] = useState([]);
  const [currentOpseraUser, setCurrentOpseraUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadOpseraUsers();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  // TODO: Pull into general helper
  const loadOpseraUsers = async () => {
    console.log("dataObject: " + JSON.stringify(dataObject));
    const response = await accountsActions.getUsers(getAccessToken);
    // console.log("Opsera Users: \n" + JSON.stringify(response.data));

    let parsedUserNames = [];
    Object.keys(response.data["users"]).length > 0 && response.data["users"].map(user => {
      let orgDomain = user.email.substring(user.email.lastIndexOf("@") + 1);
      if (dataObject.isNew() || dataObject["orgDomain"].includes(orgDomain)) {
        if (dataObject.getData("orgOwnerEmail") != null) {
          if (user["email"] === dataObject.getData("orgOwnerEmail")) {
            setCurrentOpseraUser({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
          }
        }
        parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
      }
    });
    // console.log("Parsed Organization Names: " + JSON.stringify(parsedUserNames));
    setOpseraUsersList(parsedUserNames);
  };

  const addAdmin = (user) => {
    let newAdmin = {
      name: user.accountName,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.email,
      departmentName: user.organizationName,
      preferredName: "",
      division: "",
      teams: ["team1"],
      title: "",
      site: "Site1"
    };

    dataObject.setData("administrator", {...newAdmin});
    setDataObject({...dataObject});
  };

  const handleOpseraUserChange = (selectedOption) => {
    let option = selectedOption.id;
    setCurrentOpseraUser(option);
    dataObject.setData("orgOwner", option["firstName"] + " " + option["lastName"]);
    dataObject.setData("orgOwnerEmail", option["email"]);
    setDataObject({...dataObject});
    addAdmin(option);
  };


  return (
    <div className="custom-select-input m-2">
      <label className="mt-0"><span>Opsera Customer Record<span className="danger-red">*</span></span></label>
      <DropdownList
        data={opseraUserList}
        valueField={valueField}
        textField={textField}
        filter='contains'
        groupBy={user => capitalizeFirstLetter(user.id.organizationName, "-", "No Organization Name")}
        defaultValue={currentOpseraUser}
        onChange={handleOpseraUserChange}
      />
    </div>
  );
}

LdapOrganizationAccountOpseraUserSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

LdapOrganizationAccountOpseraUserSelectInput.defaultProps = {
  valueField: "value",
  textField: "text"
};

export default LdapOrganizationAccountOpseraUserSelectInput;