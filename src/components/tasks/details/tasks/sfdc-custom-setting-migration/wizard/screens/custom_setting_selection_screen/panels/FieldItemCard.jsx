import React, {useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";

function FieldItemCard({field, selectedFields, setSelectedFields}) {
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
        let newSelectedUsers = selectedFields.filter(user => user.name !== field.name);
        setSelectedFields([...newSelectedUsers]);
      }
    }
  };

  return (
    <li key={field.name} className={selectedFields.includes(field) ? "p-2 member-list selected" : "p-2 member-list"} onClick={selectUser}>
      <div className="px-2 justify-content-between d-flex w-100">
        <Col lg={12} xl={6} className={"no-wrap-inline"}>{field.name}</Col>
      </div>
    </li>
  );
}

FieldItemCard.propTypes = {
  field: PropTypes.object,
  selectedFields: PropTypes.array,
  setSelectedFields: PropTypes.func,
};

export default FieldItemCard;