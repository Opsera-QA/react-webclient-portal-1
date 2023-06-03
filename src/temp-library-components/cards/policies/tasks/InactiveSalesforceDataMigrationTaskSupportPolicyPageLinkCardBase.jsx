import React from "react";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PropType from "prop-types";
import PolicyRoleHelper from "@opsera/know-your-role/roles/settings/policies/policyRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function InactiveSalesforceDataMigrationTaskSupportPolicyPageLinkCardBase({ onClickFunction, }) {
  const { userData } = useComponentStateReference();

  const getBody = () => {
    return (
      <div>
        <div className={"mb-2"}>The {policyConstants.POLICY_NAME_LABELS.ENABLE_SALESFORCE_DATA_MIGRATION_TASK} Policy is an optional Policy that Site Administrators can enable.</div>
        <div className={"mb-2"}>Enabling this rule would allow users to use Opsera to migrate data from one Salesforce instance to another. Where required, the mocking of data will be applied and the same can be leverage by users while seeding data into sandboxes.</div>
      </div>
    );
  };

  const title = (
    <div className={"d-flex justify-content-between"}>
      <div>{policyConstants.POLICY_NAME_LABELS.ENABLE_SALESFORCE_DATA_MIGRATION_TASK}</div>
    </div>
  );

  return (
    <SelectionCardBase
      className={"my-3"}
      titleText={title}
      inactive={true}
      body={getBody()}
      onClickFunction={onClickFunction}
      disabled={PolicyRoleHelper.canEditPolicies(userData) !== true}
    />
  );
}

InactiveSalesforceDataMigrationTaskSupportPolicyPageLinkCardBase.propTypes = {
  onClickFunction: PropType.func,
};
