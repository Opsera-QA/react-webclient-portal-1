import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import FieldLabel from "components/common/fields/FieldLabel";
import {Button} from "react-bootstrap";

function JiraSecondaryUsersField({ dataObject, fieldName, jiraUsers, isLoading }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getFormattedUsers = () => {
    const accountIds = dataObject.getData(fieldName);
    if (!Array.isArray(accountIds) || accountIds.length === 0) {
      return "No Secondary Users Assigned";
    }

    if (isLoading) {
      return <span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>{dataObject.getData(fieldName)}</span>;
    }

    if (jiraUsers != null && jiraUsers.length > 0) {
      return (
        accountIds.map((jiraUserId, i) => {
          const jiraUser = jiraUsers.find((user) => user.accountId === jiraUserId)
          let jiraName = jiraUser ? jiraUser.displayName :  `No User Found for ID: [${jiraUserId}]`;

          return (
            <Button key={i} variant="primary" className="mx-1 mb-1" size="sm">
              {jiraName}
            </Button>
          );
        })
      );
    }

    return (
      <div>
        <div>Could Not Pull Jira Users. Secondary User Account IDs:</div>
        {accountIds.map((jiraUserId, i) => {
          return (
            <Button key={i} variant="primary" className="mx-1 mb-1" size="sm">
              {jiraUserId}
            </Button>
          )
        })}
      </div>
    );
  };

  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span>{getFormattedUsers()}</span>
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