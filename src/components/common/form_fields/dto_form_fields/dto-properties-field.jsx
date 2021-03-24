import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import NameValueTable from "../../table/nameValueTable";

// TODO: Rewrite once I have a better idea of what we need
function DtoPropertiesField({dataObject, fieldName, fields}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [rowList, setRowList ] = useState([]);

  useEffect(() => {
    console.log(dataObject.getData(fieldName));
      if(Object.keys(dataObject.getData(fieldName)).length > 0) {
        prePopulateData();
      }
  }, []);

  //We are computing the number of rows required based on the data from API
  const prePopulateData = () => {
    let newRows = [];
    Object.keys(dataObject.getData(fieldName)).forEach((item) => {
      let newRow = {};
      //For each field set the default data
      fields.map((field, key) => {
        newRow[field] = field === "name" ? item : dataObject.getData(fieldName)[item];
      });
      newRows.push(newRow);
    });
    setRowList([
      ...newRows
    ]);
  };

  return (
    <>
      {field && rowList &&
        <div className="custom-item-input m-2">
          <div className="custom-item-input">
            <NameValueTable label={field.label} data={rowList} valueFormat={"boolean"} />
          </div>
        </div>
      }
    </>
  );
}

DtoPropertiesField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  fields: PropTypes.array,
};

DtoPropertiesField.defaultProps = {
  fields: ["name", "value"]
};

export default DtoPropertiesField;