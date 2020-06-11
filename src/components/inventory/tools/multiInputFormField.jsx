import React, { useState, useEffect } from "react";
import { Table, Button, Form, } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

function MultiInputFormField(props) {
  const { defaultValue, formField } = props;
  const [rowList, setRowList ] = useState([]);

  //On load create one row
  useEffect(() => {    
    //When it's a new form, defaultValue will be undefined
    if(defaultValue == undefined) {
      addRow();
    }else {
      if(defaultValue.length > 0) {
        prePopulateData();
      }else {
        addRow();
      }
    }
  }, []);

  //Everytime a row is added or updated, call parent to construct the payload
  useEffect(() => {    
    props.onChange(rowList);
  }, [rowList]);

  //We are computing the number of rows required based on the data from API
  const prePopulateData = () => {
    let newRows = [];
    defaultValue.map((data) => {
      let firstRow = {};
      //For each field set the default data
      formField.fields.map((field, key) => {
        firstRow[field] = data[field];
      });
      newRows.push(firstRow);
    });
    setRowList([
      ...newRows
    ]);
  };

  //Add new row to the table
  const addRow = () => {
    let firstRow = {};
    //Since every form field have different header. We are generating it dynamically 
    formField.fields.map((field, key) => {
      firstRow[field] =  "";
    });

    setRowList([
      ...rowList,
      {
        ...firstRow
      }]);

    console.log(rowList);
  };

  //Find index of deleted row and update the master list
  const deleteRow = (event, row) => {
    event.stopPropagation();
    let index = rowList.indexOf(row);
    rowList.splice(index, 1);
    setRowList([
      ...rowList
    ]);
  };

  const updateCellData = (event, row, field) => {
    event.stopPropagation();
    let index = rowList.indexOf(row);
    rowList[index][field] = event.target.value;
    setRowList([
      ...rowList
    ]);
  };

  return (
    <>
      <Table borderless={true} size="sm">
        <thead>
          <tr>
            {formField.fields.map((field, key) => {
              return <th key={key} className="text-muted" style={{ textTransform: "capitalize", fontWeight: "normal", fontSize: "14px" }}>{field}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rowList.map((row, key) => {
            return <tr key={key}>
              {formField.fields.map((field, key) => {

                return <td key={key}><Form.Control defaultValue={row[field]} disabled={field == "id" || field == "identifier"} type="text" size="sm" placeholder={"New " + `${field}`} onChange={e => updateCellData(e, row, field)} /></td>;
              })}
              {formField.showEditButton && <td><Button variant="outline-danger" size="sm" onClick={e => deleteRow(e, row)} ><FontAwesomeIcon icon={faTrash}/></Button></td>}
            </tr>;
          })}
        </tbody>
      </Table>
      {formField.showEditButton && <Button variant="primary" size="sm" onClick={addRow}><FontAwesomeIcon icon={faPlus} className="mr-1"/> Add</Button>}
    </>
  );
}

MultiInputFormField.propTypes = {
  formField: PropTypes.object,
  onChange: PropTypes.func.isRequired
};


export default MultiInputFormField;