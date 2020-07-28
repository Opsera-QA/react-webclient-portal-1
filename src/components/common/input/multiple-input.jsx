import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Table } from "react-bootstrap";
import validate from "../../../utils/formValidation";
import MultiInputFormField from "./multiInputFormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

// TODO: Rewrite and rename after refactoring
function MultipleInput({ field, formData, setData }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [rowList, setRowList ] = useState([]);

  useEffect(() => {
    prePopulateData(formData);
  }, []);

  //We are computing the number of rows required based on the data from API
  const prePopulateData = (formData) => {
    console.log("FormData in prePopulate data: " + JSON.stringify(formData));
    console.log("Object.keys(formData[field.id]).id: " + Object.keys(formData[field.id]));
    let newRows = [];
    if (formData && formData[field.id]) {
      Object.keys(formData[field.id]).map((data, index) => {
        console.log("Data: " + data);
        let newRow = {};
        // TODO: This needs to be rewritten and will only take two values
        console.log("field.fields[\"0\"]: " + field.fields["0"]);
        newRow[field.fields["0"]] = data;
        newRow[field.fields["1"]] = formData[field.id][data];
        newRows.push(newRow);
      });

      console.log("newRows in prePopulate data: " + JSON.stringify(newRows));
    }
    setRowList([
      ...newRows
    ]);
  };

  //Add new row to the table
  const addRow = () => {
    //Since every form field have different header. We are generating it dynamically
    let newRow = {};
    // TODO: This needs to be rewritten and will only take two values
    newRow[field.fields["0"]] = "";
    newRow[field.fields["1"]] = "";

    setRowList([
      ...rowList,
      {
        ...newRow
      }]);
  };

  //Find index of deleted row and update the master list
  const deleteRow = (event, row) => {
    event.stopPropagation();
    let index = rowList.indexOf(row);
    rowList.splice(index, 1);
    setRowList([
      ...rowList
    ]);
    setData(field.id, rowList.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {}));
  };

  const updateCellData = (event, row, field, innerField) => {
    event.stopPropagation();
    let index = rowList.indexOf(row);
    rowList[index][innerField] = event.target.value;
    setRowList([
      ...rowList
    ]);
    setData(field.id, rowList.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {}));
  };

  // TODO: remove or enable, if (un)necessary
  // const validateAndSetData = (field, value) => {
  //   let { isValid, errorMessage } = validate(value, field);
  //   setIsValid(isValid);
  //   setErrorMessage(errorMessage);
  //   setData(field.id, value);
  // };

  return (
    field ?
    // TODO: Extract into regular inputs for easier maintenance/styling
    // TODO: Make custom-toggle-input css
      <>
        <Form.Group className="custom-text-input" controlId={field.id}>
          <Form.Label>
            <span>{field.label}{field.rules.isRequired ? <span className="danger-red">*</span> : null }</span>
          </Form.Label>
          {rowList && rowList.length > 0 ?
            <>
              <Table borderless={true} size="sm" style={{ marginBottom: "0" }}>
                <tbody>
                  {rowList.map((row, key) => {
                    return <tr key={key}>
                      {field.fields.map((innerField, key) => {
                        return <td key={key}><Form.Control defaultValue={row[innerField]} type="text" size="sm" placeholder={"New " + `${innerField}`} onChange={e => updateCellData(e, row, field, innerField)} /></td>;
                      })}
                      {field.showEditButton && <td className="text-right"><Button variant={ Object.values(row)[0] && Object.values(row)[0].length == 0 ? "outline-secondary" : "outline-danger"} size="sm" onClick={e => deleteRow(e, row)} ><FontAwesomeIcon icon={faTrash} /></Button></td>}
                    </tr>;
                  })}
                </tbody>
              </Table>
              <div className="text-right mr-1"><Button variant="primary" size="sm" onClick={addRow}><FontAwesomeIcon icon={faPlus}/></Button></div>
            </> :
            <>
              <div className="d-flex">
                <div className="p-2 text-center text-muted">No Entries</div>
                <div className="ml-auto p-2 text-right mr-1"><Button variant="primary" size="sm" onClick={addRow}><FontAwesomeIcon icon={faPlus}/></Button></div>
              </div>

            </>}
          <Form.Control.Feedback type="invalid">
            <div>{errorMessage}</div>
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            <div>{field.fieldText}</div>
          </Form.Text>
        </Form.Group>
      </>
      : null
  );
}

MultipleInput.propTypes = {
  setData: PropTypes.func,
  field: PropTypes.object,
  formData: PropTypes.object
};

export default MultipleInput;