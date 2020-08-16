import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

// TODO: Rework
function DtoItemDisplayer({dataObject, fieldName, removeItem}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  return (
    <>
      {field &&
        <div className="custom-text-input">
          <label />
          <div className="custom-item-input justify-content-between">
            {dataObject.getData(fieldName).map((item, i) => (
              <Button key={item} variant="primary" className="mb-1 mr-1" size="sm">
                {item}
                {removeItem && <span className="ml-2" onClick={() => {
                  removeItem(i);
                }}><FontAwesomeIcon icon={faTimes} fixedWidth/></span>
                }
              </Button>
            ))}
          </div>
        </div>
      }
    </>
  );
}

DtoItemDisplayer.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  removeItem: PropTypes.func
};

export default DtoItemDisplayer;