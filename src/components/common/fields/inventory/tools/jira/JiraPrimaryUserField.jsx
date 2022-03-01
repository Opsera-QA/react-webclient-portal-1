import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import LoadingIcon from "components/common/icons/LoadingIcon";

function JiraPrimaryUserField({ dataObject, fieldName, jiraUsers, isLoading }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getUserName = () => {
    const accountId = dataObject.getData(fieldName);
    if (accountId === "") {
      return "No Primary User Assigned";
    }

    if (isLoading) {
      return <span><LoadingIcon className={"mr-1"}/>{dataObject.getData(fieldName)}</span>;
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