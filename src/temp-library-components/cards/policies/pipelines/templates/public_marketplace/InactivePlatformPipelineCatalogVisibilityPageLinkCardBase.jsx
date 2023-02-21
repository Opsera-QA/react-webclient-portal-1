import React from "react";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PropType from "prop-types";

export default function InactivePlatformPipelineCatalogVisibilityPageLinkCardBase({ onClickFunction, }) {
  const getBody = () => {
    return (
      <div>
        <div className={"mb-2"}>The {policyConstants.POLICY_NAME_LABELS.PLATFORM_PIPELINE_CATALOG_VISIBILITY} Policy is an optional Policy that Site Administrators can enable.</div>
        <div className={"mb-2"}>{`By activating this Policy, you can remove visibility of Opsera's Pipeline Marketplace.`}</div>
      </div>
    );
  };

  const title = (
    <div className={"d-flex justify-content-between"}>
      <div>{policyConstants.POLICY_NAME_LABELS.PLATFORM_PIPELINE_CATALOG_VISIBILITY}</div>
    </div>
  );

  return (
    <SelectionCardBase
      className={"my-3"}
      titleText={title}
      inactive={true}
      body={getBody()}
      onClickFunction={onClickFunction}
    />
  );
}

InactivePlatformPipelineCatalogVisibilityPageLinkCardBase.propTypes = {
  onClickFunction: PropType.func,
};
