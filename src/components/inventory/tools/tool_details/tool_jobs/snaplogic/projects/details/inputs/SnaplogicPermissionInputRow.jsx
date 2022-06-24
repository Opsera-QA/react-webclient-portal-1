import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";
import StandaloneMultiSelectInput from "../../../../../../../../common/inputs/multi_select/StandaloneMultiSelectInput";

const permissionsList = [
  { name: "Read", value: "R" },
  { name: "Write", value: "W" },
  { name: "Execute", value: "X" },
];

const subjectTypeOptions = [
  { name: "User", value: "USER" },
  { name: "Group", value: "GROUP" },
];

function SnaplogicPermissionInputRow({
  index,
  disabled,
  updatePermissionsRow,
  updateSubjectTypeRow,
  updateSubjectRow,
  deleteThresholdRow,
  userGroups,
  perms,
  subject_type,
  subject,
  loading,
}) {
  const getPermissionsInput = () => {
    return (
      <StandaloneMultiSelectInput
        selectOptions={permissionsList}
        valueField={"value"}
        textField={"name"}
        value={perms}
        disabled={disabled}
        placeholderText={"Select A Permission Level"}
        setDataFunction={(newValue) => updatePermissionsRow(newValue)}
      />
    );
  };
  const getSubjectTypeInput = () => {
    return (
      <StandaloneSelectInput
        selectOptions={subjectTypeOptions}
        valueField={"value"}
        textField={"name"}
        value={subject_type}
        disabled={disabled}
        placeholder={"Select A Group Type"}
        setDataFunction={(newValue) => updateSubjectTypeRow(newValue)}
      />
    );
  };

  const getUserGroupInput = () => {
    return (
      <StandaloneSelectInput
        selectOptions={userGroups ? userGroups : []}
        value={subject}
        disabled={disabled}
        placeholderText={"Select A User Group"}
        setDataFunction={(newValue) => updateSubjectRow(newValue)}
      />
    );
  };

  const getDeletePropertyButton = (index) => {
    if (disabled !== true) {
      return (
        <Button
          variant="link"
          onClick={() => deleteThresholdRow(index)}
        >
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

  return (
    <div
      className="d-flex py-2"
      key={index}
    >
      <Col sm={11}>
        <Row className={"pl-2"}>
          <Col
            sm={4}
            className={"pl-0 pr-1"}
          >
            {getPermissionsInput()}
          </Col>
          <Col
            sm={4}
            className={"pl-1 pr-0"}
          >
            {getSubjectTypeInput()}
          </Col>
          <Col
            sm={4}
            className={"pl-3 pr-0"}
          >
            {subject_type === "USER" ? (
              <input
                disabled={disabled}
                value={subject}
                onChange={(event) => updateSubjectRow(event.target.value)}
                autoComplete={"off"}
                className="form-control"
              />
            ) : (
              <>{getUserGroupInput()}</>
            )}
          </Col>
        </Row>
      </Col>
      <Col
        sm={1}
        className={"px-0 ml-auto mr-auto delete-button"}
      >
        {getDeletePropertyButton(index)}
      </Col>
    </div>
  );
}

SnaplogicPermissionInputRow.propTypes = {
  index: PropTypes.number,
  userGroups: PropTypes.array,
  updatePermissionsRow: PropTypes.func,
  updateSubjectTypeRow: PropTypes.func,
  updateSubjectRow: PropTypes.func,
  deleteThresholdRow: PropTypes.func,
  disabled: PropTypes.bool,
  perms: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  subject_type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subject: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
};

export default SnaplogicPermissionInputRow;
