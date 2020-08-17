import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, Form, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

// TODO: Rewrite once I have a better idea of what we need
function DtoPropertiesInput({dataObject, setDataObject, fieldName, fields, removeItem}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [rowList, setRowList ] = useState([]);

  //On load create one row
  useEffect(() => {
    console.log(dataObject.getData(fieldName));
    //When it's a new form, defaultValue will be undefined
      if(Object.keys(dataObject.getData(fieldName)).length > 0) {
        prePopulateData();
      }
      else {
        addRow();
      }
  }, []);

  //We are computing the number of rows required based on the data from API
  const prePopulateData = () => {
    let newRows = [];
    Object.keys(dataObject.getData(fieldName)).map((item) => {
      let firstRow = {};
      //For each field set the default data
      fields.map((field, key) => {
        firstRow[field] = field == "name" ? item : dataObject.getData(fieldName)[item];
      });
      newRows.push(firstRow);
    });
    setRowList([
      ...newRows
    ]);
  };

  //Add new row to the table
  const addRow = () => {
    let newRowList = rowList;
    let newRow = {};
    //Since every form field have different header. We are generating it dynamically
    fields.map((field, key) => {
      newRow[field] =  "";
    });

    newRowList.push(newRow);
    setRowList([...newRowList]);
    updateData(newRowList);
  };

  //Find index of deleted row and update the master list
  const deleteRow = (event, row) => {
    event.stopPropagation();
    let newRowList = rowList
    let index = newRowList.indexOf(row);
    newRowList.splice(index, 1);
    setRowList([...newRowList]);
    // let newDataObject = dataObject;
    // console.log("RowList: " + JSON.stringify(rowList.reduce((obj, item) => Object.assign(obj, {[item.name]: item.value}))));
    // newDataObject.setData(fieldName, newRowList.reduce((obj, item) => Object.assign(obj, {[item.name]: item.value}), {}));
    // setDataObject({...newDataObject});
    updateData(newRowList);
  };

  const updateData = (newRowList) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, newRowList.reduce((obj, item) => Object.assign(obj, {[item.name]: item.value}), {}));
    setDataObject({...newDataObject});
  }

  const updateCellData = (event, row, field) => {
    event.stopPropagation();
    let newRowList = rowList
    let index = newRowList.indexOf(row);
    newRowList[index][field] = event.target.value;
    setRowList([...newRowList]);
    updateData(newRowList);
  };

  const updateCheckedCell = (event, row, field) => {
    event.stopPropagation();
    let newRowList = rowList
    let index = newRowList.indexOf(row);
    newRowList[index][field] = !newRowList[index][field];
    setRowList([...newRowList]);
    updateData(newRowList);
  };

  return (
    <>
      {field &&
        <div className="custom-text-input m-2">
          <label className="mt-2"><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null}</span></label>
          <div className="custom-item-input">
            <Table borderless={true} size="sm">
              <thead>
              <tr>
                {fields.map((field, key) => {
                  return <th key={key} className="text-muted" style={{ textTransform: "capitalize", fontWeight: "normal", fontSize: "14px" }}>{field}</th>;
                })}
              </tr>
              </thead>
              <tbody>
              {rowList.map((row, key) => {
                return <tr key={key}>
                  {fields.map((field, key2) => {
                    return (
                      <td key={key2}>
                        {field === "name" && <Form.Control defaultValue={row.name} disabled={key === 0 || !dataObject.isNew()} type="text" size="sm" placeholder={"New " + `${field}`} onChange={e => updateCellData(e, row, field)} />}
                        {field === "value" && <Form.Check type="checkbox" checked={row.value} onChange={e => updateCheckedCell(e, row, field)} style={{ textAlign: "center", padding: 0, marginTop: "8px" }} />}
                      </td>
                    );
                  })}
                  {dataObject.isNew() && <td><Button variant="primary" size="sm" onClick={addRow}><FontAwesomeIcon icon={faPlus}/></Button></td>}
                  <td>{key > 0 && <Button variant={ Object.values(row)[0].length == 0 ? "outline-secondary" : "outline-danger"} size="sm" onClick={e => deleteRow(e, row)} ><FontAwesomeIcon icon={faTrash} /></Button>} </td>
                </tr>;
              })}
              </tbody>
            </Table>
          </div>
        </div>
      }
    </>
  );
}

DtoPropertiesInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  fields: PropTypes.array,
  removeItem: PropTypes.func
};

export default DtoPropertiesInput;