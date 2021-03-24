import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import FieldLabel from "components/common/fields/FieldLabel";

function JiraPrimaryUserField({ dataObject, fieldName, jiraUsers, isLoading }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getUserName = () => {
    const accountId = dataObject.getData(fieldName);
    if (accountId === "") {
      return "No Primary User Assigned";
    }

    if (isLoading) {
      return <span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>{dataObject.getData(fieldName)}</span>;
    }

    if (jiraUsers != null && jiraUsers.length > 0) {
      const jiraUser = jiraUsers.find((user) => user.accountId === accountId);

      if (jiraUser != null) {
       return jiraUser.displayName ;
      }

      return `No User Found for ID: [${accountId}]`;
    }

    return `Could Not Pull Jira Users. Primary User Account ID: [${accountId}]`;
  };

  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span>{getUserName()}</span>
    </FieldContainer>
  );
}

JiraPrimaryUserField.propTypes = {
  dataObject: PropTypes.object,
  jiraUsers: PropTypes.array,
  isLoading: PropTypes.bool,
  fieldName: PropTypes.string
};

export default JiraPrimaryUserField;