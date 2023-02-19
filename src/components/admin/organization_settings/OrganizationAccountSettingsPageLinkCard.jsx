import React  from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import OptionCardBase from "components/common/card/option/OptionCardBase";
import {organizationSettingsHelper} from "components/admin/organization_settings/organizationSettings.helper";

export default function OrganizationAccountSettingsPageLinkCard(
  {
    organizationAccount,
    className,
  }) {
  const history = useHistory();

  const onClickFunction = () => {
    history.push(organizationSettingsHelper.getDetailViewLink(organizationAccount?.orgDomain, organizationAccount?.name));
  };

  const getBody = () => {
    return (
      <div>
        <div className={"mr-3 page-link-card-title-text"}>{organizationAccount.accountName || organizationAccount?.name}</div>
        <div className={"text-muted mt-1"}>{organizationAccount.orgDomain}</div>
        <div className={"text-muted mt-1"}>{organizationAccount.orgOwner}</div>
        <div className={"text-muted mt-1"}>{organizationAccount.description}</div>
      </div>
    );
  };

  if (organizationAccount == null) {
    return null;
  }

  return (
    <OptionCardBase
      className={className}
      body={getBody()}
      onClickFunction={onClickFunction}
    />
  );
}

OrganizationAccountSettingsPageLinkCard.propTypes = {
  organizationAccount: PropTypes.object,
  className: PropTypes.string,
};
