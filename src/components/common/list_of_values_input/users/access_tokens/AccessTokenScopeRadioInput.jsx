import React from "react";
import PropTypes from "prop-types";
import RadioButtonInputContainer from "components/common/inputs/radio/RadioButtonInputContainer";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AccessTokenScopeRadioInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <RadioButtonInputContainer dataObject={dataObject} fieldName={fieldName}>
      <Row className={"mx-0"}>
        <Col md={6}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
            value={"api"}
            label={
              <span>
                <div><strong>API Access</strong></div>
                Grants complete read/write access to the API, including all Pipeline and Tool Registry routes based on individual resource access roles.
             </span>
            }
          />
        </Col>
        <Col md={6}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
            value={"api-readonly"}
            label={
              <span>
                <div><strong>API Access (Read Only)</strong></div>
                Grants complete read access to the API, including all Pipeline and Tool Registry routes based on individual resource access roles.
              </span>
            }
          />
        </Col>
        <Col md={6}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
            value={"pipeline"}
            label={
              <span>
                <div><strong>Pipeline Access</strong></div>
                Grants access to the Pipeline Orchestration API,
                including updating data and run operations based on the role access permitted for this user in that pipeline.
                Site wide roles and individual pipeline access rules are enforced.
              </span>
            }
          />
        </Col>
        <Col md={6}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
            value={"pipeline-readonly"}
            label={
              <span>
                <div><strong>Pipeline Logs (Read Only)</strong></div>
                Grants read access only to the Pipeline API for getting log activity and status updates.  No actions are supported.
              </span>
            }
          />
        </Col>
        <Col md={6}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
            value={"registry"}
            label={
              <span>
                <div><strong>Tool Registry Access</strong></div>
                Grants access to the Tool Registry API,
                including creating tools, updating data and account information based on the role access permitted for this user for that tool.
                Site wide roles and individual tool access rules are enforced.
              </span>
            }
          />
        </Col>
        <Col md={6}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
            value={"registry-readonly"}
            label={
              <span>
                <div><strong>Tool Registry (Read Only)</strong></div>
                Grants read access only to the Tool Registry API for getting tool details or relevant log activity.  No actions are supported.
              </span>
            }
          />
        </Col>
        <Col md={6}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
            value={"tasks"}
            label={
              <span>
                <div><strong>Tasks Access</strong></div>
                Grants access to the Opsera Tasks API for specifically running tasks based on the role access permitted for this user in that task.
                Site wide roles and individual task access rules are enforced.
              </span>
            }
          />
        </Col>
        <Col md={6}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
            value={"tasks-readonly"}
            label={
              <span>
                <div><strong>Tasks Access (Read Only)</strong></div>
                Grants read access only to the Opsera Tasks API for getting log activity on tasks. No actions are supported.
              </span>
            }
          />
        </Col>
        <Col md={6}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
            value={"security-logs"}
            label={
              <span>
                <div><strong>Security Logs (Read Only)</strong></div>
                Grants read access only to the Opsera Platform user activity logs.  No actions are supported with this token.
              </span>
            }
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