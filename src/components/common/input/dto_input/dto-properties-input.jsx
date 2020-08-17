import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Row, Col, Button, Form, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

// TODO: Rewrite once I have a better idea of what we need
// For now, this is not dynamic and will only deal with name/boolean value pairs
function DtoPropertiesInput({dataObject, setDataObject, fieldName, fields, removeItem}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [rowList, setRowList ] = useState([]);

  useEffect(() => {
    //When it's a new form, defaultValue will be undefined
      if(Object.keys(dataObject.getData(fieldName)).length > 0) {
        prePopulateData();
      }
  }, []);

  const prePopulateData = () => {
    let newRows = [];
    Object.keys(dataObject.getData(fieldName)).map((item) => {
      let newRow = {};
      newRow["name"] = item;
      newRow["value"] = dataObject.getData(fieldName)[item] === true;
      newRows.push(newRow);
    });
    setRowList([...newRows]);
  };

  const addRow = () => {
    let newRowList = rowList;
    let newRow = {
      name: "",
      value: false
    };
    newRowList.push(newRow);
    updateData(newRowList);
  };

  const deleteRow = (event, row) => {
    event.stopPropagation();
    let newRowList = rowList
    let index = newRowList.indexOf(row);
    newRowList.splice(index, 1);
    setRowList([...newRowList]);
    updateData(newRowList);
  };

  const updateData = (newRowList) => {
    setRowList([...newRowList]);
    let newDataObject = dataObject;
    let newData = newRowList.reduce((obj, item) => Object.assign(obj, {[item.name]: item.value}), {});
    newDataObject.setData(fieldName, newData);
    setDataObject({...newDataObject});
  }

  const updateCellData = (event, row, field) => {
    event.stopPropagation();
    let newRowList = rowList
    let index = newRowList.indexOf(row);
    newRowList[index][field] = event.target.value;
    updateData(newRowList);
  };

  const updateCheckedCell = (event, row, field) => {
    event.stopPropagation();
    let newRowList = rowList
    let index = newRowList.indexOf(row);
    newRowList[index][field] = !newRowList[index][field];
    updateData(newRowList);
  };

  return (
    <>
      {field &&
        <div className="custom-text-input m-2 form-group">
          <label className=""><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null}</span></label>
          <div className="custom-item-input">
              {rowList.map((row, key) => {
                return (
                <Row key={key} className="mb-2 mr-1">
                  <Col lg={9} className="pr-0">
                    <Form.Control defaultValue={row.name} disabled={key === 0 || !dataObject.isNew()} type="text" size="sm" placeholder={"New Property Name"} onChange={e => updateCellData(e, row, "name")} />
                  </Col>
                  <Col lg={1} className="px-2">
                    <Form.Check custom id={row.name + "-value-" + key} type="switch" className="m-auto" label="" checked={row.value} onChange={event => {updateCheckedCell(event, row, "value")}} />
                  </Col>
                  <Col lg={1} className="px-2">
                    {dataObject.isNew() && <Button className="button button-add py-0" variant="link" size="sm" onClick={addRow}><FontAwesomeIcon icon={faPlus}/></Button>}
                  </Col>
                  <Col lg={1} className="px-2">
                    {dataObject.isNew() && key > 0 && <Button size="sm" variant="link" className="button button-delete danger-red m-auto py-0" onClick={e => deleteRow(e, row)} ><FontAwesomeIcon icon={faTrash} /></Button>}
                  </Col>
                </Row>
                );
              })}
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