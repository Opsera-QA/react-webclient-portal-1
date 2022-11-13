import React from "react";
import PropTypes from "prop-types";
import RadioButtonInputContainer from "components/common/inputs/radio/RadioButtonInputContainer";
import RadioButtonCard from "components/common/inputs/radio/RadioButtonCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AccessTokenScopeRadioInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <RadioButtonInputContainer dataObject={dataObject} fieldName={fieldName}>
      <Row>
        <Col xs={12} md={6} className={"d-flex"}>
          <RadioButtonCard
            fieldName={fieldName}
            model={dataObject}
            setModel={setDataObject}
            disabled={disabled}
            value={"api"}
            label={<span>API Access</span>}
            description={"Grants complete read/write access to the API, including all Pipeline and Tool Registry routes based on individual resource access roles."}
          />
        </Col>
        <Col xs={12} md={6} className={"d-flex"}>
          <RadioButtonCard
            fieldName={fieldName}
            model={dataObject}
            setModel={setDataObject}
            disabled={disabled}
            value={"api-readonly"}
            label={<span>API Access (Read Only)</span>}
            description={"Grants complete read access to the API, including all Pipeline and Tool Registry routes based on individual resource access roles."}
          />
        </Col>
        <Col xs={12} md={6} className={"d-flex"}>
          <RadioButtonCard
            fieldName={fieldName}
            model={dataObject}
            setModel={setDataObject}
            disabled={disabled}
            value={"pipeline"}
            label={<span>Pipeline Access</span>}
            description={`
              Grants access to the Pipeline Orchestration API,
                including updating data and run operations based on the role access permitted for this user in that pipeline.
                Site wide roles and individual pipeline access rules are enforced.
            `}
          />
        </Col>
        <Col xs={12} md={6} className={"d-flex"}>
          <RadioButtonCard
            fieldName={fieldName}
            model={dataObject}
            setModel={setDataObject}
            disabled={disabled}
            value={"pipeline-readonly"}
            label={<span>Pipeline Access (Read Only)</span>}
            description={`Grants read access only to the Pipeline API for getting log activity and status updates.  No actions are supported.`}
          />
        </Col>
        <Col xs={12} md={6} className={"d-flex"}>
          <RadioButtonCard
            fieldName={fieldName}
            model={dataObject}
            setModel={setDataObject}
            disabled={disabled}
            value={"registry"}
            label={<span>Tool Registry Access</span>}
            description={`
              Grants access to the Tool Registry API,
                including creating tools, updating data and account information based on the role access permitted for this user for that tool.
                Site wide roles and individual tool access rules are enforced.
            `}
          />
        </Col>
        <Col xs={12} md={6} className={"d-flex"}>
          <RadioButtonCard
            fieldName={fieldName}
            model={dataObject}
            setModel={setDataObject}
            disabled={disabled}
            value={"registry-readonly"}
            label={<span>Tool Registry Access (Read Only)</span>}
            description={` Grants read access only to the Tool Registry API for getting tool details or relevant log activity.  No actions are supported.`}
          />
        </Col>
        <Col xs={12} md={6} className={"d-flex"}>
          <RadioButtonCard
            fieldName={fieldName}
            model={dataObject}
            setModel={setDataObject}
            disabled={disabled}
            value={"tasks"}
            label={<span>Tasks Access</span>}
            description={`
            Grants access to the Opsera Tasks API for specifically running tasks based on the role access permitted for this user in that task.
                Site wide roles and individual task access rules are enforced.
            `}
          />
        </Col>
        <Col xs={12} md={6} className={"d-flex"}>
          <RadioButtonCard
            fieldName={fieldName}
            model={dataObject}
            setModel={setDataObject}
            disabled={disabled}
            value={"tasks-readonly"}
            label={<span>Tasks Access (Read Only)</span>}
            description={`Grants read access only to the Opsera Tasks API for getting log activity on tasks. No actions are supported.`}
          />
        </Col>
        <Col xs={12} md={6} className={"d-flex"}>
          <RadioButtonCard
            fieldName={fieldName}
            model={dataObject}
            setModel={setDataObject}
            disabled={disabled}
            value={"security-logs"}
            label={<span>Security Logs (Read Only)</span>}
            description={`Grants read access only to the Opsera Platform user activity logs.  No actions are supported with this token.`}
          />
        </Col>
      </Row>
    </RadioButtonInputContainer>
  );
}

AccessTokenScopeRadioInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

AccessTokenScopeRadioInput.defaultProps = {
  fieldName: "scope",
};

export default AccessTokenScopeRadioInput;