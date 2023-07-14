import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInputBase from "components/common/inputs/boolean/CheckboxInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import { dataSeedingFieldsMetadata } from "./dataSeedingFields.metadata";

const DataSeedingFieldEditorPanel = ({
  id,
  fieldIndex,
  fieldsData,
  setFieldData,
  isLoading,
  disabled,
}) => {
  const [fieldsMetadata, setFieldsMetadata] = useState(undefined);

  useEffect(() => {
    const newMetadata = modelHelpers.parseObjectIntoModel(
      fieldsData,
      dataSeedingFieldsMetadata,
    );
    setFieldsMetadata(newMetadata);
  }, [fieldsData]);

  if (isLoading || !fieldsData) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Fetching Fields"}
      />
    );
  }

  const setDataFunction = (fieldName, newValue) => {
    const newModel = { ...fieldsMetadata };
    newModel?.setData(fieldName, newValue);
    setFieldsMetadata({ ...newModel });
    setFieldData(id, fieldIndex, newModel.getPersistData());
  };

  return (
    <Row className={"m-2"}>
      <Col lg={12}>
        <Row className={"mx-0"}>
          <Col
            lg={4}
            style={{ overflowWrap: "anywhere"}}
          >
            <TextFieldBase
              dataObject={fieldsMetadata}
              fieldName={"label"}
            />
          </Col>
          <Col
            lg={4}
            style={{ overflowWrap: "anywhere"}}
          >
            <TextFieldBase
              dataObject={fieldsMetadata}
              fieldName={"name"}
            />
          </Col>
          <Col
            lg={4}
            className={"d-flex mb-1 mt-1 justify-content-end"}
          >
            <Col lg={6}>
              <CheckboxInputBase
                className={"ml-3"}
                fieldName={"isMock"}
                model={fieldsMetadata}
                setModel={setFieldsMetadata}
                setDataFunction={setDataFunction}
                disabled={fieldsMetadata?.getData("isMockDisabled")}
              />
            </Col>
            <Col lg={6}>
              <CheckboxInputBase
                fieldName={"externalRefId"}
                model={fieldsMetadata}
                setModel={setFieldsMetadata}
                setDataFunction={setDataFunction}
                disabled={fieldsMetadata?.getData("isExternalRefIdDisabled")}
              />
            </Col>
          </Col>
        </Row>
        <Col lg={12} className={"d-flex mb-1 mt-1 justify-content-end"}>
          {!fieldsMetadata?.getData("nillable") ? (
            <div
              className={"badge badge-danger mr-2"}
              style={{ fontSize: "10px", letterSpacing: "0.6px" }}
            >
              MANDATORY
            </div>
          ) : null}
          <div
            className={"badge badge-secondary mr-2"}
            style={{ fontSize: "10px", letterSpacing: "0.6px" }}
          >
            {fieldsMetadata?.getData("type")?.toUpperCase()}
          </div>
        </Col>
      </Col>

    </Row>
  );
};

DataSeedingFieldEditorPanel.propTypes = {
  id: PropTypes.number,
  fieldIndex: PropTypes.number,
  setFieldData: PropTypes.func,
  isLoading: PropTypes.bool,
  fieldsData: PropTypes.object,
  disabled: PropTypes.bool,
};

export default DataSeedingFieldEditorPanel;
