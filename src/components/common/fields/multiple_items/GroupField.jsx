import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {faUserFriends} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function GroupField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getGroups = () => {
    const groups = dataObject.getData(fieldName);

    if (!groups || !Array.isArray(groups) || groups.length === 0) {
      return <span>User is not a member of any groups.</span>;
    }

    return (
      groups.map((group, i) => {
        return (
          <span key={i} className="mx-1 mb-1 badge badge-light group-badge">
            <IconBase icon={faUserFriends} className={"mr-1"}/>{`${group}`}
          </span>
        );
      })
    );
  };

  return (
    <FieldContainer className={className}>
      <FieldLabel fieldName={fieldName} field={field}/>
      <span className="item-field">
        {getGroups()}
      </span>
    </FieldContainer>
  );
}

GroupField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default GroupField;