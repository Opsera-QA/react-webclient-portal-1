import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faClipboardListCheck} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import axios from "axios";
import OctopusTenantInputRow from "components/common/inputs/object/pipelines/octopus/OctopusTenantInputRow";

function OctopusTenantInputBase({ fieldName, model, setModel, helpComponent, disabled, className, environmentList, tenantList }) {
  const [field] = useState(model.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [rows, setRows] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    unpackData();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [environmentList]);

  useEffect(() => {
    if (Array.isArray(tenantList) && tenantList.length === 0) {
      setRows([{id: "", name: "", environmentId: ""}]);
    }
  }, [JSON.stringify(tenantList)]);

  const unpackData = () => {
    let currentData = model.getData(fieldName);
    let unpackedData = [];

    if (Array.isArray(currentData) && currentData.length > 0) {
      unpackedData = currentData.filter((tenant) => {
        const environmentId = tenant?.environmentId;
        const foundEnvironment = environmentList.find((environment) => {
          return environment.id === environmentId;
        });
        return foundEnvironment != null;
      });

    } else {
      unpackedData.push({id: "", name: "", environmentId: ""});
    }

    setRows([...unpackedData]);
  };

  const validateAndSetData = (newRowList) => {
    if (Array.isArray(newRowList) && newRowList?.length > field.maxItems) {
      setErrorMessage(`
        This feature is currently limited to a maximum of 10 tenants. 
        If you have a need to exceed that limit, please contact Opsera with details on specific requirements
      `);
      return;
    }

    setRows([...newRowList]);
    let newModel = {...model};

    let newArray = [];

    if (Array.isArray(newRowList) && newRowList.length > 0) {
      newRowList.map((item) => {
        const id = item?.id;
        const name = item?.name;
        const environmentId = item?.environmentId;

        if (id === "" || name === "" || environmentId === "") {
          return;
        }

        newArray.push(item);
      });
    }

    newModel.setData(fieldName, [...newArray]);
    setModel({...newModel});
  };

  const isRowComplete = (row) => {
    return row?.id !== "" && row?.environmentId !== "" && row?.name !== "";
  };

  const lastRowComplete = () => {
    let newList = rows;

    if (newList.length === 0) {
      return true;
    }

    let lastObject = newList[newList.length - 1];
    return isRowComplete(lastObject);
  };

  const addRow = () => {
    let newList = [...rows];

    if (lastRowComplete()) {
      let newRow = {id: "", name: "", environmentId: ""};
      newList.push(newRow);
      validateAndSetData(newList);
    }
  };

  const deleteRow = (index) => {
    let newList = rows;
    newList.splice(index, 1);
    validateAndSetData(newList);
  };

  const updateEnvironment = (index, newValue) => {
    let newPropertyList = rows;
    newPropertyList[index].environmentId = newValue;
    newPropertyList[index].id = "";
    newPropertyList[index].name = "";
    validateAndSetData(newPropertyList);
  };

  const updateTenant = (index, newTenant) => {
    let newPropertyList = rows;
    const id = newTenant?.id;
    const name = newTenant?.name;
    newPropertyList[index].id = id;
    newPropertyList[index].name = name;
    validateAndSetData(newPropertyList);
  };

  const getFieldBody = () => {
    if (!rows || rows.length === 0) {
      return (
        <div className="roles-input">
          <div className="text-center text-muted no-data-message">No Tenant rows have been added yet.</div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {rows.map((row, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <OctopusTenantInputRow
                rows={rows}
                environmentList={environmentList}
                disabled={disabled}
                deleteRow={() => deleteRow(index)}
                environmentId={row?.environmentId}
                tenantId={row?.id}
                updateTenant={(newValue) => updateTenant(index, newValue)}
                updateEnvironment={(newValue) => updateEnvironment(index, newValue)}
                model={model}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex py-1">
        <Col sm={11}>
          <Row>
            <Col sm={6}>
              <span className="text-muted ml-5">Environment</span>
            </Col>
            <Col sm={6} className={"mx-auto"}>
              <span className="text-muted">Tenant</span>
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"} />
      </div>
    );
  };

  const getIncompleteRowsMessage = () => {
    if (!lastRowComplete()) {
      return (`Incomplete Tenant Rows Will Be Removed Upon Saving`);
    }
  };

  const getHelpComponent = () => {
    if (helpComponent) {
      return (helpComponent);
    }
  };

  if (field == null) {
    return <></>;
  }

  return (
    <div className={className}>
      <PropertyInputContainer
        titleIcon={faClipboardListCheck}
        field={field}
        addProperty={addRow}
        titleText={field?.label}
        errorMessage={errorMessage}
        type={"Tenant"}
        addAllowed={lastRowComplete() && disabled !== true}
        helpComponent={getHelpComponent()}
        incompleteRowMessage={getIncompleteRowsMessage()}
      >
        <div>
          <div className={"filter-bg-white"}>
            {getHeaderBar()}
          </div>
          <div className="rules-input">
            {getFieldBody()}
          </div>
        </div>
      </PropertyInputContainer>
    </div>
  );
}

OctopusTenantInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  helpComponent: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  environmentList: PropTypes.array,
  tenantList: PropTypes.array,
};

export default OctopusTenantInputBase;