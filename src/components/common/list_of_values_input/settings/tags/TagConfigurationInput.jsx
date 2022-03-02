import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faBracketsCurly, faExclamationTriangle, faTimes} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import {AuthContext} from "contexts/AuthContext";
import regexDefinitions from "utils/regexDefinitions";
import StandaloneComboBoxInput from "components/common/inputs/combo_box/StandaloneComboBoxInput";
import IconBase from "components/common/icons/IconBase";

function TagConfigurationInput({ fieldName, dataObject, setDataObject, disabled}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await loadData();
      }
    }
  };

  const loadData = () => {
    let currentData = dataObject.getData(fieldName);

    if (currentData)
    {
      let items = [];

      Object.keys(currentData).map((key) => {
        items.push({name: key, value: currentData[key]});
      });

      if (items.length === 0) {
        items.push({name: "", value: ""});
      }

      setProperties([...items]);
    }
  };

  const validateAndSetData = (newPropertyList) => {
    setProperties([...newPropertyList]);
    let newDataObject = {...dataObject};

    if (newPropertyList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of configuration items. Please remove one to add another.");
      return;
    }

    let newObject = {};

    if (newPropertyList && newPropertyList.length > 0) {
      newPropertyList.map((item) => {
        if (item.name !== "" && item.value !== "") {
          newObject[item.name] = item.value;
        }
      });
    }

    newDataObject.setData(fieldName, {...newObject});
    setDataObject({...newDataObject});
  };

  const addProperty = () => {
    let newPropertyList = properties;
    let lastObject = newPropertyList[newPropertyList.length - 1];

    // Do not add another row if key is not configured for last row
    if (lastObject?.name === "") {
      return;
    }

    let newRow = {name: "", value: ""};
    newPropertyList.push(newRow);
    validateAndSetData(newPropertyList);
  };

  const deleteProperty = (index) => {
    let newPropertyList = properties;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const updateProperty = (row, innerField, newValue) => {
    let newPropertyList = properties;
    let index = newPropertyList.indexOf(row);
    let format = regexDefinitions["generalText"]?.regex;
    let meetsRegex = format.test(newValue);

    if (newValue !== '' && !meetsRegex) {
      return;
    }

    if (newPropertyList[index][innerField] !== newValue) {
      newPropertyList[index][innerField] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteProperty(index)}>
        <IconBase className={"danger-red"} icon={faTimes} />
      </Button>
    );
  };

  const getHeaderBar = () => {
    return (
      <Row className="d-flex py-1 mx-0 justify-content-between">
        <Col sm={11} className={"my-auto"}>
          <Row>
            <Col xs={6}>
              Configuration Property
            </Col>
            <Col xs={6}>
              Value
            </Col>
          </Row>
        </Col>
        <Col sm={1} />
      </Row>
    );
  };

  const getPropertyRow = (property, index) => {
    return (
      <div className="d-flex py-2 justify-content-between" key={index}>
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-1"}>
              <StandaloneComboBoxInput
                selectOptions={adminTagsActions.configurationOptions}
                valueField={"id"}
                textField={"label"}
                value={property["name"]}
                placeholderText={"Select or Type a New Property"}
                setDataFunction={(value) => updateProperty(property, "name", value.id ? value.id : value)}
              />
            </Col>
            <Col sm={6} className={"pl-1 pr-0"}>
              <input
                className="form-control"
                type={"text"}
                value={property["value"]}
                onChange={(event) => updateProperty(property, "value", event.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"}>
          {getDeletePropertyButton(index)}
        </Col>
      </div>
    );
  };

  const getFieldBody = () => {
    if (!properties || properties.length === 0) {
      return (
        <div className="rules-input">
          <div className="text-muted text-center no-data-message">No configuration properties have been added to this Tag</div>
        </div>
      );
    }

    return (
      <div>
        {properties.map((property, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              {getPropertyRow(property, index)}
            </div>
          );
        })}
      </div>
    );
  };

  const isPropertyComplete = (property) => {
    return property?.name !== "" && property?.value !== "";
  };

  const lastPropertyComplete = () => {
    let newPropertyList = properties;

    if (newPropertyList.length === 0) {
      return true;
    }

    let lastObject = newPropertyList[newPropertyList.length - 1];
    return isPropertyComplete(lastObject);
  };

  const getIncompletePropertyMessage = () => {
    if (!lastPropertyComplete()) {
      return (`Incomplete ${field?.label} Will Be Removed From Saved Tag`);
    }
  };

  if (field == null || accessRoleData?.OpseraAdministrator !== true) {
    return <></>;
  }

  return (
    <PropertyInputContainer
      titleIcon={faBracketsCurly}
      field={field}
      addProperty={addProperty}
      titleText={field?.label}
      errorMessage={errorMessage}
      addAllowed={lastPropertyComplete()}
      type={"property"}
      incompleteRowMessage={getIncompletePropertyMessage()}
    >
      <div className={"filter-bg-white"}>
        {getHeaderBar()}
      </div>
      {getFieldBody()}
    </PropertyInputContainer>
  );
}

TagConfigurationInput.propTypes = {
  setDataObject: PropTypes.func,
  dataObject: PropTypes.object,
  fields: PropTypes.array,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool
};

TagConfigurationInput.defaultProps = {
  fieldName: "configuration"
};

export default TagConfigurationInput;