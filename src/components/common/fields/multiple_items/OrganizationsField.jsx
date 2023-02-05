import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {faSitemap} from "@fortawesome/pro-light-svg-icons";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import IconBase from "components/common/icons/IconBase";
import useGetOrganizationNamesByIds from "hooks/settings/insights/organizations/names/useGetOrganizationNamesByIds";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function OrganizationsField(
  {
    model,
    fieldName,
    className,
    showLabel,
  }) {
  const field = model?.getFieldById(fieldName);
  const parsedIdArray = DataParsingHelper.parseMongoDbIdArray(model?.getArrayData(fieldName));
  const {
    organizations,
    isLoading,
  } = useGetOrganizationNamesByIds(model?.getArrayData(fieldName));

  const getOrganizations = () => {
    if (isLoading) {
      return (
        <CustomBadgeContainer>
          <span className="item-field">
            {parsedIdArray.map((organization, i) => {
              return (
                <span key={i} className={`mx-1 mb-1 badge badge-light item-badge`}>
                    <IconBase
                      icon={faSitemap}
                      isLoading={isLoading}
                      className={"mr-1"}
                    />
                  {`${organization})`}
                </span>
              );
            })}
          </span>
        </CustomBadgeContainer>
      );
    }

    const parsedOrganizations = DataParsingHelper.parseArray(organizations, []);

    if (parsedOrganizations.length === 0) {
      return null;
    }

    return (
      <CustomBadgeContainer>
        <span className="item-field">
          {parsedOrganizations.map((organization, i) => {
            return (
              <span key={i} className={`mx-1 mb-1 badge badge-light item-badge`}>
                <IconBase icon={faSitemap} className={"mr-1"}/>{`${organization?.name} (${organization?._id})`}
              </span>
            );
          })}
        </span>
      </CustomBadgeContainer>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel fieldName={fieldName} field={field} showLabel={showLabel}/>
      {getOrganizations()}
    </FieldContainer>
  );
}

OrganizationsField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool
};
