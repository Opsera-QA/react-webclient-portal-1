import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import IconBase from "components/common/icons/IconBase";
import {faPencil, faTimes} from "@fortawesome/pro-light-svg-icons";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import AccessRuleModel from "components/common/inputs/roles/model/accessRule.model";
import accessControlRuleTypeConstants from "@opsera/know-your-role/constants/accessControlRuleType.constants";
import siteRoleConstants from "@opsera/know-your-role/constants/siteRole.constants";
import accessControlRuleRoleConstants from "@opsera/know-your-role/constants/accessControlRuleRole.constants";

export default function RoleAccessInputInlineField(
  {
    deleteAccessRuleFunction,
    editAccessRoleFunction,
    accessRule,
  }) {
  const accessRuleTypeModel = new AccessRuleModel(accessRule, false);

  const getValueField = () => {
    const type = accessRuleTypeModel?.getType();

    if (accessControlRuleTypeConstants.isAccessControlRuleTypeValid(type) !== true) {
      return null;
    }

    const value = accessRuleTypeModel?.getData(type);

    switch (type) {
      case accessControlRuleTypeConstants.ACCESS_CONTROL_RULE_TYPES.SITE_ROLE:
        return (
          <div>{siteRoleConstants.getSiteRoleLabel(value)}</div>
        );
      case accessControlRuleTypeConstants.ACCESS_CONTROL_RULE_TYPES.GROUP:
      case accessControlRuleTypeConstants.ACCESS_CONTROL_RULE_TYPES.USER:
        return (
          <div>{value}</div>
        );
    }

  };

  return (
    <div className={"d-flex my-3"}>
      <Col sm={10} className={"my-auto"}>
        <Row>
          <Col sm={4}>
            <div>{accessControlRuleTypeConstants.getAccessControlRuleTypeLabel(accessRuleTypeModel?.getType())}</div>
          </Col>
          <Col sm={4}>
            <span>{getValueField()}</span>
          </Col>
          <Col sm={4}>
            <span>{accessControlRuleRoleConstants.getAccessControlRuleRoleLabel(accessRuleTypeModel?.getData("role"))}</span>
          </Col>
        </Row>
      </Col>
      <Col sm={2} className={"d-flex"}>
        <div className={"ml-auto d-flex"}>
          <Button variant={"link"} onClick={deleteAccessRuleFunction}>
            <span><IconBase className={"danger-red"} icon={faTimes}/></span>
          </Button>
          <Button variant={"link"} onClick={editAccessRoleFunction}>
            <span><IconBase className={"text-muted"} icon={faPencil}/></span>
          </Button>
        </div>
      </Col>
    </div>
  );
}

RoleAccessInputInlineField.propTypes = {
  deleteAccessRuleFunction: PropTypes.func,
  accessRule: PropTypes.object,
  editAccessRoleFunction: PropTypes.func,
};
