import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faUserFriends} from "@fortawesome/pro-light-svg-icons";

function RoleAccessField({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getRoleAccessConfigurationItems = () => {
    if (dataObject?.getData(fieldName) == null || dataObject?.getData(fieldName)?.length === 0) {
      return <span>No Role Access Configurations Applied</span>;
    }

    return (
      dataObject.getData(fieldName).map((item, i) => {
        const user = item["user"];
        const group = item["group"];

        if (user) {
          return (
            <span key={i} className="mx-1 mb-1 badge badge-primary">
              <FontAwesomeIcon icon={faUser} fixedWidth className="mr-1"/>{`${user}: ${item.role}`}
            </span>
          );
        }

        return (
          <span key={i} className="mx-1 mb-1 badge badge-secondary">
            <FontAwesomeIcon icon={faUserFriends} fixedWidth className="mr-1"/>{`${group}: ${item.role}`}
          </span>
        );
      })
    );
  };

  return (
    <FieldContainer>
      <FieldLabel fieldName={fieldName} field={field}/>
      <span className="item-field">
        {getRoleAccessConfigurationItems()}
      </span>
    </FieldContainer>
  );
}

RoleAccessField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default RoleAccessField;