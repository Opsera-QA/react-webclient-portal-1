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
          xl={12}
          className={"no-wrap-inline mb-1"}
        >
          {field.name}
        </Col>
        <Col
          sm={3}
          className={
            selectedFields.includes(field)
              ? "d-flex w-100"
              : "d-flex w-100 text-muted"
          }
        >
          <div
            className={"badge badge-secondary"}
            style={{ fontSize: "10px", letterSpacing: "0.6px" }}
          >
            {field?.type?.toUpperCase()}
          </div>
        </Col>
        <Col
          sm={3}
          className={
            selectedFields.includes(field)
              ? "d-flex w-100"
              : "d-flex w-100 text-muted"
          }
        >
          <div
            className={
              field?.nillable ? "badge badge-danger" : "badge badge-success"
            }
            style={{ fontSize: "10px", letterSpacing: "0.6px" }}
          >
            MANDATORY
          </div>
        </Col>
        <Col
          sm={3}
          className={
            selectedFields.includes(field)
              ? "d-flex w-100"
              : "d-flex w-100 text-muted"
          }
        >
          <div
            className={
              field?.unique ? "badge badge-danger" : "badge badge-success"
            }
            style={{ fontSize: "10px", letterSpacing: "0.6px" }}
          >
            UNIQUE
          </div>
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
