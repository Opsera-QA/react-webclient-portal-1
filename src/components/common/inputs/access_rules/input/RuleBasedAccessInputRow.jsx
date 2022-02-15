import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import IconBase from "components/common/icons/IconBase";
import AccessRuleTypeStandaloneSelectInput
  from "components/common/inputs/access_rules/input/AccessRuleTypeStandaloneSelectInput";
import {accessRuleTypeConstants} from "components/common/inputs/access_rules/constants/AccessRuleType.constants";
import AccessRuleSsoUserOrganizationNameStandaloneMultiSelectInput
  from "components/common/inputs/access_rules/input/AccessRuleSsoUserOrganizationNameStandaloneMultiSelectInput";

function RuleBasedAccessInputRow(
  { 
    disabled,
    setAccessRoleTypeFunction,
    ssoUserOrganizationNames,
    setAccessRoleValueFunction,
    disabledSsoUserOrganizations,
    accessRule,
    deleteAccessRule,
  }) {

  const getDeletePropertyButton = () => {
    if (disabled !== true) {
      return (
        <Button variant="link" onClick={deleteAccessRule}>
          <span>
            <IconBase
              className={"danger-red"}
              icon={faTimes}
            />
          </span>
        </Button>
      );
    }
  };

  const getValueInput = () => {
    switch(accessRule?.type) {
      case accessRuleTypeConstants.ACCESS_RULE_TYPES.ALLOWED_SSO_USER_ORGANIZATIONS:
        return (
          <AccessRuleSsoUserOrganizationNameStandaloneMultiSelectInput
            disabled={disabled || disabledSsoUserOrganizations}
            setDataFunction={setAccessRoleValueFunction}
            value={accessRule?.value}
            ssoUserOrganizationNames={ssoUserOrganizationNames}
          />
        );
    }
  };

  return (
    <div className={"d-flex py-2"}>
      <Col sm={11}>
        <Row>
          <Col sm={3} className={"pr-1"}>
            <AccessRuleTypeStandaloneSelectInput
              value={accessRule?.type}
              setDataFunction={setAccessRoleTypeFunction}
              disabled={disabled || true}
            />
          </Col>
          <Col sm={9} className={"pl-2 pr-2"}>
            {getValueInput()}
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"px-0 mr-auto delete-button"}>
        {getDeletePropertyButton()}
      </Col>
    </div>
  );
}

RuleBasedAccessInputRow.propTypes = {
  disabled: PropTypes.bool,
  deleteAccessRule: PropTypes.func,
  ssoUserOrganizationNames: PropTypes.array,
  disabledSsoUserOrganizations: PropTypes.array,
  setAccessRoleValueFunction: PropTypes.func,
  setAccessRoleTypeFunction: PropTypes.func,
  accessRule: PropTypes.object,
};

export default RuleBasedAccessInputRow;