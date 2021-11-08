import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import UserBadge from "components/common/badges/user/UserBadge";
import GroupBadge from "components/common/badges/group/GroupBadge";

function RoleAccessField({dataObject, fieldName, noDataMessage, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getRoleAccessConfigurationItems = () => {
    if (dataObject?.getData(fieldName) == null || dataObject?.getData(fieldName)?.length === 0) {
      return <span>{noDataMessage}</span>;
    }

    return (
      dataObject.getData(fieldName).map((item, i) => {
        const user = item["user"];
        const group = item["group"];

        if (user) {
          return (
            <UserBadge
              badgeText={`${user}: ${item.role}`}
              className={"mx-1 mb-1"}
              key={i}
            />
          );
        }

        return (
          <GroupBadge
            badgeText={`${group}: ${item.role}`}
            className={"mx-1 mb-1"}
            key={i}
          />
        );
      })
    );
  };

  return (
    <FieldContainer className={className}>
      <FieldLabel fieldName={fieldName} field={field}/>
      <span className="item-field role-access">
        {getRoleAccessConfigurationItems()}
      </span>
    </FieldContainer>
  );
}

RoleAccessField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  noDataMessage: PropTypes.any,
  className: PropTypes.string
};

export default RoleAccessField;