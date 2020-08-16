import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, Form, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";

// TODO: Rewrite and rename after refactoring
function DtoMultipleInput({dataObject, setDataObject, fieldName, fields}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [rowList, setRowList] = useState([]);

  useEffect(() => {
    prePopulateData();
  }, []);

  //We are computing the number of rows required based on the data from API
  const prePopulateData = () => {
    let rows = [];
    let currentData = dataObject.getData(fieldName);
    // console.log("fieldName: " + fieldName);
    // console.log("CurrentData: " + JSON.stringify(currentData));
    // if (currentData) {
    //   Object.keys(currentData).map((data, index) => {
    //     console.log("Data: " + data);
    //     let row = {};
    //     fields.map((field, key) => {
    //       row[field] = data[index][field];
    //     });
    //     rows.push(row);
    //   });
    // }
    setRowList([
      ...currentData
    ]);
  };

  //Add new row to the table
  const addRow = () => {
    let newRowList = rowList;
    //Since every form field have different header. We are generating it dynamically
    let newRow = {};

    fields.map(field => {
      newRow[field] = "";
    })

    console.log("New row: " + JSON.stringify(newRow));

    newRowList.push(newRow);

    console.log("New newRowList: " + JSON.stringify(newRowList));
    setRowList([...newRowList]);

    let newDataObject = dataObject;
    // console.log("RowList: " + JSON.stringify(rowList.reduce((obj, item) => Object.assign(obj, {[item.name]: item.value}))));
    newDataObject.setData(fieldName, newRowList.reduce((obj, item) => Object.assign(obj, {[item.name]: item.value}), {}));
    setDataObject({...newDataObject});
  };

  //Find index of deleted row and update the master list
  const deleteRow = (event, row) => {
    event.stopPropagation();
    let newRowList = rowList
    let index = newRowList.indexOf(row);
    newRowList.splice(index, 1);
    setRowList([...newRowList]);
    let newDataObject = dataObject;
    // console.log("RowList: " + JSON.stringify(rowList.reduce((obj, item) => Object.assign(obj, {[item.name]: item.value}))));
    newDataObject.setData(fieldName, newRowList.reduce((obj, item) => Object.assign(obj, {[item.name]: item.value}), {}));
    setDataObject({...newDataObject});
  };

  const updateCellData = (event, row, field, innerField) => {
    event.stopPropagation();
    let newRowList = rowList
    let index = newRowList.indexOf(row);
    // console.log("index: " + index);
    newRowList[index][innerField] = event.target.value;
    setRowList([...newRowList]);
    let newDataObject = dataObject;
    // newDataObject.setData(fieldName, newRowList.reduce((obj, item) => Object.assign(obj, {[item.name]: item.value})));
    newDataObject.setData(fieldName, newRowList);

    // console.log("newDataObject: " + JSON.stringify(newDataObject.getData(fieldName)));
    setDataObject({...newDataObject});
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
        <Form.Group className="custom-text-input m-2" controlId={field.id}>
          <Form.Label>
            <span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null}</span>
          </Form.Label>
          {rowList && rowList.length > 0 ?
            <>
              <Table borderless={true} size="sm" style={{marginBottom: "0"}}>
                <tbody>
                {rowList.map((row, key) => {
                  return <tr key={key}>
                    {fields.map((innerField, key) => {
                      return <td key={key}><Form.Control defaultValue={row[innerField]} type="text" size="sm"
                                                         placeholder={"New " + `${innerField}`}
                                                         onChange={e => updateCellData(e, row, field, innerField)}/>
                      </td>;
                    })}
                    {<td className="text-right"><Button
                      variant={Object.values(row)[0] && Object.values(row)[0].length == 0 ? "outline-secondary" : "outline-danger"}
                      className="multi-input-button" size="sm" onClick={e => deleteRow(e, row)}><FontAwesomeIcon icon={faTimes}/></Button></td>}
                  </tr>;
                })}
                <tr>
                  {fields.map((row, i) => { return <td key={i} /> })}
                  <td className="text-right">
                    <Button className="multi-input-button" variant="outline-primary" size="sm" onClick={addRow}><FontAwesomeIcon icon={faPlus}/></Button>
                  </td>
                </tr>
                </tbody>
              </Table>
            </> :
            <>

              <div className="w-100">
                <div className="d-flex flex-row-reverse">
                  <div className="text-right mr-1"><Button variant="primary" size="sm"
                                                           onClick={addRow}><FontAwesomeIcon
                    icon={faPlus}/></Button></div>
                  <div className="text-muted mr-2 mt-1">No Entries</div>
                </div>
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

DtoMultipleInput.propTypes = {
  setDataObject: PropTypes.func,
  dataObject: PropTypes.object,
  fields: PropTypes.array,
  fieldName: PropTypes.string
};

export default DtoMultipleInput;