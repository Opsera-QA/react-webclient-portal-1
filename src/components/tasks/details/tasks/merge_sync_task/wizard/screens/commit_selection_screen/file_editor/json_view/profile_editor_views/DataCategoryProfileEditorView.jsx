import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInputBase from "../../../../../../../../../../common/inputs/boolean/CheckboxInputBase";
import modelHelpers from "../../../../../../../../../../common/model/modelHelpers";
import { jsonViewFileMetadata } from "../../../jsonViewFile.metadata";
import TextFieldBase from "../../../../../../../../../../common/fields/text/TextFieldBase";
import { dataCategoryGrpJsonMetadata } from "../jsonFileEdit.metadata";
import SelectInputBase from "../../../../../../../../../../common/inputs/select/SelectInputBase";

const grpVisibilityOptions = [
  { name: "All", value: "ALL" },
  { name: "Custom", value: "CUSTOM" },
  { name: "None", value: "NONE" },
];

const DataCategoryProfileEditorView = ({
  dataCategory,
  setDataCategoryJson,
  isLoading,
  disabled,
}) => {
  const [dataCategoryJsonMetadata, setDataCategoryJsonMetadata] =
    useState(undefined);

  useEffect(() => {
    const newDataCategoryMetadata = modelHelpers.parseObjectIntoModel(
      dataCategory,
      dataCategoryGrpJsonMetadata,
    );
    setDataCategoryJsonMetadata(newDataCategoryMetadata);
  }, [dataCategory]);

  if (isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Fetching Permissions"}
      />
    );
  }

  const setDataFunction = (fieldName, newValue) => {
    const newModel = { ...dataCategoryJsonMetadata };
    newModel?.setData(fieldName, newValue?.value);
    setDataCategoryJsonMetadata({ ...newModel });
    setDataCategoryJson(newModel.getPersistData());
  };

  return (
    <Row>
      <Col lg={12}>
        <TextFieldBase
          dataObject={dataCategoryJsonMetadata}
          fieldName={"dataCategoryGroup"}
        />
      </Col>
      <Col lg={6}>
        <SelectInputBase
          fieldName={"visibility"}
          selectOptions={grpVisibilityOptions}
          dataObject={dataCategoryJsonMetadata}
          setDataObject={setDataCategoryJsonMetadata}
          setDataFunction={setDataFunction}
          valueField={"value"}
          textField={"name"}
          busy={isLoading}
          placeholderText={"Select Category Group Visibility"}
          disabled={disabled}
        />
      </Col>
    </Row>
  );
};

DataCategoryProfileEditorView.propTypes = {
  setDataCategoryJson: PropTypes.func,
  isLoading: PropTypes.bool,
  dataCategory: PropTypes.object,
  disabled: PropTypes.bool,
};

export default DataCategoryProfileEditorView;
