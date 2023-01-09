import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import IconBase from "components/common/icons/IconBase";
import {faPencil, faTimes} from "@fortawesome/pro-light-svg-icons";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import AccessRuleModel from "components/common/inputs/roles/model/accessRule.model";

export default function RoleAccessInputInlineField(
  {
    deleteAccessRuleFunction,
    editAccessRoleFunction,
    accessRule,
  }) {
  const accessRuleTypeModel = new AccessRuleModel(accessRule, false);

  return (
    <div className={"d-flex"}>
      <Col sm={11} className={"my-auto"}>
        <Row>
          <Col sm={4}>
            <span className="text-muted ml-5">{accessRuleTypeModel?.getType()}</span>
          </Col>
          <Col sm={4} className={"mx-auto"}>
            <span className={"text-muted"}>{accessRuleTypeModel?.getData(accessRuleTypeModel?.getType())}</span>
          </Col>
          <Col sm={4} className={"mx-auto"}>
            <span className={"text-muted"}>{accessRuleTypeModel?.getData("role")}</span>
          </Col>
        </Row>
      </Col>
      <Col sm={1} className={"px-0 mr-auto delete-button d-flex"}>
        <Button variant={"link"} onClick={deleteAccessRuleFunction}>
          <span><IconBase className={"danger-red"} icon={faTimes}/></span>
        </Button>
        <Button variant={"link"} onClick={editAccessRoleFunction}>
          <span><IconBase className={"text-muted"} icon={faPencil}/></span>
        </Button>
      </Col>
    </div>
  );
}

RoleAccessInputInlineField.propTypes = {
  deleteAccessRuleFunction: PropTypes.func,
  accessRule: PropTypes.object,
  editAccessRoleFunction: PropTypes.func,
};
