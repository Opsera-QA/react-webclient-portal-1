import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {faSitemap} from "@fortawesome/pro-light-svg-icons";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import IconBase from "components/common/icons/IconBase";

// TODO: Pull names with IDs
function OrganizationsField({dataObject, fieldName, className, showLabel}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  // TODO: After all organizations, remove this.
  // Legacy organizations are name value objects
  const parseNewOrganizations = () => {
    const currentOrganizations = dataObject?.getArrayData(fieldName);

    if (Array.isArray(currentOrganizations) && currentOrganizations.length > 0) {
      return currentOrganizations.filter((organization) => typeof organization === "string");
    }

    return [];
  };

  const getOrganizations = () => {
    const parsedOrganizations = parseNewOrganizations();

    if (parsedOrganizations.length === 0) {
      return null;
    }

    return (
      parsedOrganizations.map((organization, i) => {
        return (
          <span key={i} className={`mx-1 mb-1 badge badge-light item-badge`}>
            <IconBase icon={faSitemap} className={"mr-1"}/>{`${organization}`}
          </span>
        );
      })
    );
  };

  return (
    <FieldContainer className={className}>
      <CustomBadgeContainer>
        <FieldLabel fieldName={fieldName} field={field} showLabel={showLabel}/>
        <span className="item-field">
          {getOrganizations()}
        </span>
      </CustomBadgeContainer>
    </FieldContainer>
  );
}

OrganizationsField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool
};

export default OrganizationsField;