import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import LoadingIcon from "components/common/icons/LoadingIcon";

function JiraSecondaryUsersField({ dataObject, fieldName, jiraUsers, isLoading }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getFormattedUsers = () => {
    const accountIds = dataObject.getData(fieldName);
    if (!Array.isArray(accountIds) || accountIds.length === 0) {
      return "No Secondary Users Assigned";
    }

    if (isLoading) {
      return <span><LoadingIcon className={"mr-1"}/>{dataObject.getData(fieldName)}</span>;
    }

    if (jiraUsers != null && jiraUsers.length > 0) {
      return (
        accountIds.map((jiraUserId, i) => {
          const jiraUser = jiraUsers.find((user) => user.accountId === jiraUserId);
          let jiraName = jiraUser ? jiraUser.displayName :  `No User Found for ID: [${jiraUserId}]`;

          return (
            <span key={i} className="mx-1 mb-1 badge badge-secondary">
              {jiraName}
            </span>
          );
        })
      );
    }

    return (
      <div>
        <div>Could Not Pull Jira Users. Secondary User Account IDs:</div>
        {accountIds.map((jiraUserId, i) => {
          return (
            <span key={i} className="mx-1 mb-1 badge badge-secondary">
              {jiraUserId}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span className="item-field">{getFormattedUsers()}</span>
    </FieldContainer>
  );
}

JiraSecondaryUsersField.propTypes = {
  dataObject: PropTypes.object,
  jiraUsers: PropTypes.array,
  isLoading: PropTypes.bool,
  fieldName: PropTypes.string
};

export default JiraSecondaryUsersField;