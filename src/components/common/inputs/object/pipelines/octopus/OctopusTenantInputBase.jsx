import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faClipboardListCheck} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";
import OctopusTenantInputRow from "components/common/inputs/object/pipelines/octopus/OctopusTenantInputRow";

function OctopusTenantInputBase({ fieldName, model, setModel, helpComponent, disabled, className, environmentList }) {
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
  }, []);

  const unpackData = () => {
    let currentData = model.getData(fieldName);
    let unpackedData = [];

    if (Array.isArray(currentData) && currentData.length > 0) {
      unpackedData = currentData;
    } else {
      unpackedData.push({id: "", name: "", environmentId: ""});
    }

    setRows([...unpackedData]);
  };

  const validateAndSetData = (newRowList) => {
    setRows([...newRowList]);
    let newModel = {...model};

    if (Array.isArray(newRowList) && newRowList?.length > field.maxItems) {
      setErrorMessage(`
        This feature is currently limited to a maximum of 10 tenants. 
        If you have a need to exceed that limit, please contact Opsera with details on specific requirements
      `);
      return;
    }

    let newArray = [];

    if (Array.isArray(newRowList) && newRowList.length > 0) {
      newRowList.map((item) => {
        const level = item?.level;
        const count = item?.count;

        if (level === "" || count === "") {
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
    let newList = rows;

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

    if (newPropertyList[index]?.environmentId !== newValue) {
      newPropertyList[index].environmentId = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const updateTenant = (index, newTenant) => {
    let newPropertyList = rows;

    const id = newTenant?.id;
    const name = newTenant?.name;

    if (id != null && name != null) {
      newPropertyList[index].id = id;
      newPropertyList[index].name = name;
      validateAndSetData(newPropertyList);
    }
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
                environmentList={environmentList}
                disabled={disabled}
                deleteThresholdRow={() => deleteRow(index)}
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

  const getThresholdMessage = () => {
    return (`If a Threshold level is not assigned, any hits at that level will be ignored.`);
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
      <InfoText customMessage={getThresholdMessage()} />
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
  environmentList: PropTypes.string,
};

export default OctopusTenantInputBase;