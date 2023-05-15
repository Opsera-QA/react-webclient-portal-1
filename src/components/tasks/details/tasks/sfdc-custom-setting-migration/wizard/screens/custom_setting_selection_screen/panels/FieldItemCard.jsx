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
          (user) => user.name !== field.name,
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
          xl={6}
          className={"no-wrap-inline mb-1"}
        >
          {field.name}
        </Col>
        <Col
          lg={12}
          xl={6}
          className={"d-flex mb-1 mt-1 justify-content-end"}
        >
          <div
            className={"badge badge-secondary mr-2"}
            style={{ fontSize: "10px", letterSpacing: "0.6px" }}
          >
            {field?.type?.toUpperCase()}
          </div>
          {field?.unique ? (
            <div
              className={"badge badge-secondary mr-2"}
              style={{ fontSize: "10px", letterSpacing: "0.6px" }}
            >
              UNIQUE
            </div>
          ) : null}
          {!field?.nillable ? (
            <div
              className={"badge badge-danger mr-2"}
              style={{ fontSize: "10px", letterSpacing: "0.6px" }}
            >
              MANDATORY
            </div>
          ) : null}
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
