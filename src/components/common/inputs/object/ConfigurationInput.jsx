import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, Form, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import InputLabel from "components/common/form_fields/input/InputLabel";
import InfoText from "components/common/form_fields/input/InfoText";

// TODO: Rename KeyValueInput?
function ConfigurationInput({dataObject, setDataObject, fieldName, disabledFields}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [configurationItems, setConfigurationItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    let currentData = dataObject.getData(fieldName);

    console.log("CONFIG: " + JSON.stringify(dataObject.getPersistData()))

    // TODO: Make method to extract key value pairs into rows
    // //  and then make one to construct the object into a master object
    // if (currentData)
    // {
    //   let items = [];
    //   currentData.map((item) => {
    //     items.push(name)
    //   });
    //   setConfigurationItems([...currentData]);
    // }
  };

  const validateAndSetData = (newRowList) => {
    setConfigurationItems([...newRowList]);
    let newDataObject = dataObject;

    if (newRowList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of configuration items. Please remove one to add another.");
      return;
    }

    newDataObject.setData(fieldName, [...newRowList]);
    setDataObject({...newDataObject});
  }

  const addRow = () => {
    let newRowList = configurationItems;
    let newRow = {name: "", value: ""};
    newRowList.push(newRow);
    validateAndSetData(newRowList);
  };

  const deleteRow = (row) => {
    // event.stopPropagation();
    let newRowList = configurationItems
    let index = newRowList.indexOf(row);
    newRowList.splice(index, 1);
    validateAndSetData(newRowList);
  };

  const updateCellData = (row, innerField, value) => {
    let newRowList = configurationItems
    let index = newRowList.indexOf(row);
    newRowList[index][innerField] = value;
    validateAndSetData(newRowList);
  };

  const getDeleteButton = (row) => {
    return (
      <Button
        variant={Object.values(row)[0] && Object.values(row)[0].length === 0 ? "outline-secondary" : "outline-danger"}
        className="multi-input-button"
        size="sm"
        onClick={(event) => deleteRow(event, row)}>
        <FontAwesomeIcon icon={faTimes}/>
      </Button>
    )
  };

  const getAddRowButton = () => {
    return (
      <Button className="multi-input-button" variant="link" size="sm" onClick={() => addRow()}>
        <FontAwesomeIcon icon={faPlus}/>
      </Button>
    );
  }

  const getTableRow = (row, key) => {
    console.log("IN GET TABLE ROW: " + JSON.stringify(row));
    return (
      <tr key={key}>
        <td key={`${key}-name`}>
          <input
            value={row["name"]}
            className="form-control"
            onChange={(event) => updateCellData(row, "name", event.target.value)}
          />
        </td>
        <td key={`${key}-value`}>
          <input
            value={row["value"]}
            className="form-control"
            onChange={(event) => updateCellData(row, "name", event.target.value)}
          />
        </td>
        <td key={`${key}-delete`} className="text-right">
          {getDeleteButton(row)}
        </td>
      </tr>
    );
  };

  const getFieldBody = () => {
    if (!configurationItems || configurationItems.length === 0) {
      return (
        <div className="w-100">
          <div className="d-flex flex-row-reverse">
            <div className="text-right mr-1">
              <Button className="btn-add" variant="link" size="sm" onClick={addRow}><FontAwesomeIcon
                icon={faPlus}/></Button></div>
            <div className="text-muted mr-2 mt-1">No Entries</div>
          </div>
        </div>
      );
    }

    return (configurationItems.map((row, key) => {getTableRow(row, key)}));
  };

  if (field == null) {
    return <></>;
  }

  return (
    <div className="m-2">
      <div className="d-flex justify-content-between">
        <InputLabel field={field}/>
        {getAddRowButton()}
      </div>
      <Table size="sm" className="table-content-block">
        <tbody>
          {getFieldBody()}
        </tbody>
      </Table>
      <InfoText field={field} errorMessage={errorMessage} />
    </div>
  );
}

ConfigurationInput.propTypes = {
  setDataObject: PropTypes.func,
  dataObject: PropTypes.object,
  fields: PropTypes.array,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string
};

ConfigurationInput.defaultProps = {
  disabledFields: []
}

export default ConfigurationInput;