import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import DtoFilterSelectInput from "../input/DtoFilterSelectInput";
import {AuthContext} from "../../../../contexts/AuthContext";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {getUsersByDomain} from "../../../settings/ldap_users/user-functions";

function PipelineOwnerFilter({ filterDto, setFilterDto }) {
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getUsers();
    }
    catch (error) {
      toastContext.showErrorDialog(error,"Could not load users.");
    }
    finally {
      setIsLoading(false);
    }
  }

  const getUsers = async () => {
    const user = await getUserRecord();
    const {ldap} = user;
    const response = await getUsersByDomain(ldap.domain, getAccessToken);
    let users = response.data;
    let userOptions = [];

    users.map((user, index) => {
      userOptions.push({text: `Pipeline Owner: ${user["firstName"]} ${user["lastName"]}`, value:`${user["_id"]}`});
    });

    setUserOptions(userOptions);
  };

  return (
    <div><DtoFilterSelectInput fieldName={"owner"} busy={isLoading} placeholderText={"Filter by Pipeline Owner"} setDataObject={setFilterDto} dataObject={filterDto} selectOptions={userOptions} /></div>
  );
}


PipelineOwnerFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default PipelineOwnerFilter;


