import React, { useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";

function FieldItemCard({ field, selectedFields, setSelectedFields }) {
  const [fieldSelected, setFieldSelected] = useState(false);

  const selectUser = () => {
    let selectUser = !fieldSelected;
    setFieldSelected(selectUser);

    if (selectUser) {
      if (!selectedFields.includes(field)) {
        selectedFields.push(field);
        setSelectedFields([...selectedFields]);
      }
    } else {
      if (selectedFields.includes(field)) {
        let newSelectedUsers = selectedFields.filter(
          (user) => user.componentName !== field.componentName,
        );
        setSelectedFields([...newSelectedUsers]);
      }
    }
  };

  return (
    <li
      key={field.name}
      className={
        selectedFields.includes(field)
          ? "p-2 member-list selected"
          : "p-2 member-list"
      }
      onClick={selectUser}
    >
      <Row className={"mx-0"}>
        <Col
          lg={12}
          xl={12}
          className={"no-wrap-inline mb-1"}
        >
          {field.componentName}
        </Col>
      </Row>
    </li>
  );
}

FieldItemCard.propTypes = {
  field: PropTypes.object,
  selectedFields: PropTypes.array,
  setSelectedFields: PropTypes.func,
};

export default FieldItemCard;
