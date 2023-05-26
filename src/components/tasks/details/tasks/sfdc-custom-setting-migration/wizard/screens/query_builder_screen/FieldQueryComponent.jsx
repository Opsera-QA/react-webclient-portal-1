import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "../../../../../../../common/inputs/select/SelectInputBase";
import Model from "../../../../../../../../core/data_model/model";
import customSettingQueryMetadata from "./custom-setting-query-metadata";
import LoadingIcon from "../../../../../../../common/icons/LoadingIcon";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";
import { Button } from "react-bootstrap";
import IconBase from "../../../../../../../common/icons/IconBase";
import { faPlus, faTimes } from "@fortawesome/pro-light-svg-icons";
import NumberPickerInputBase from "../../../../../../../common/inputs/number/picker/base/NumberPickerInputBase";
import CustomSettingBooleanQuerySelectInput from "./inputs/CustomSettingBooleanQuerySelectInput";

const booleanOperators = [
  "=",
  "!=",
];
function FieldQueryComponent({
  index,
  fields,
  operators,
  filter,
  onFieldChange,
  onOperatorChange,
  onValueChange,
  onRemove,
  onAdd,
  isRemovable,
}) {
  const [ruleModel, setRuleModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [index, filter]);

  const loadData = () => {
    setIsLoading(true);
    let newModel = new Model({ ...filter }, customSettingQueryMetadata, false);
    setRuleModel({ ...newModel });
    setIsLoading(false);
  };
  console.log(ruleModel?.getPersistData());

  const handleFieldChange = (fieldName, selectedValue) => {
    let newDataObject = ruleModel;
    newDataObject.setData(fieldName, selectedValue.name);
    newDataObject.setData("type", selectedValue.type);
    setRuleModel({ ...newDataObject });
    onFieldChange(index, selectedValue);
  };

  const handleOperatorChange = (fieldName, selectedValue) => {
    let newDataObject = ruleModel;
    newDataObject.setData(fieldName, selectedValue);
    setRuleModel({ ...newDataObject });
    onOperatorChange(index, selectedValue);
  };

  const handleValueChange = (fieldName, value) => {
    let newDataObject = ruleModel;
    newDataObject.setData(fieldName, value);
    setRuleModel({ ...newDataObject });
    onValueChange(index, value);
  };

  const getDeleteRuleButton = (index) => {
    return (
      <Button
        variant="link"
        onClick={() => handleRemove(index)}
        // disabled={!isRemovable}
      >
        <span>
          <IconBase
            className={"danger-red"}
            icon={faTimes}
          />
        </span>
      </Button>
    );
  };

  const getAddRuleButton = (index) => {
    return (
      <Button
        variant="link"
        onClick={() => onAdd()}
      >
        <span>
          <IconBase
            className={"opsera-primary"}
            icon={faPlus}
          />
        </span>
      </Button>
    );
  };

  const handleRemove = () => {
    onRemove(index);
  };

  if (isLoading) {
    return (
      <div className={"m-3"}>
        <LoadingIcon className={"mr-2 my-auto"} />
        Loading
      </div>
    );
  }

  if (!ruleModel) {
    return null;
  }

  const getDynamicInputField = () => {
    switch (ruleModel?.getData("type")) {
      case "number":
      case "double":
        return (
          <Col
            xs={4}
            className={"pr-1 pl-0"}
          >
            <NumberPickerInputBase
              fieldName={"value"}
              dataObject={ruleModel}
              setDataObject={setRuleModel}
              setDataFunction={handleValueChange}
              showLabel={false}
            />
          </Col>
        );
      case "boolean":
        return (
          <Col
            xs={4}
            className={"pr-1 pl-0"}
          >
            <CustomSettingBooleanQuerySelectInput
              model={ruleModel}
              setModel={setRuleModel}
              setDataFunction={handleValueChange}
              fieldName={"value"}
              showLabel={false}
            />
          </Col>

        );
      default:
        return (
          <Col
            xs={4}
            className={"pr-1 pl-0"}
          >
            <TextInputBase
              setDataObject={setRuleModel}
              dataObject={ruleModel}
              fieldName={"value"}
              setDataFunction={handleValueChange}
              showLabel={false}
            />
          </Col>
        );
    }
  };

  return (
    <Row className="d-flex mx-1 justify-content-between">
      <Col sm={12} className={"px-0"}>
        <Row className={"mx-0"}>
          <Col
            xs={4}
            className={"pr-1 pl-0"}
          >
            <SelectInputBase
              fieldName={"field"}
              selectOptions={fields}
              dataObject={ruleModel}
              setDataObject={setRuleModel}
              valueField={"name"}
              textField={"name"}
              setDataFunction={handleFieldChange}
              placeholderText={"Select Field"}
              showLabel={false}
            />
          </Col>
          <Col
            xs={3}
            className={"pr-1 pl-0"}
          >
            <SelectInputBase
              fieldName={"operator"}
              selectOptions={ruleModel?.getData("type") === "boolean" ? booleanOperators : operators}
              dataObject={ruleModel}
              setDataObject={setRuleModel}
              setDataFunction={handleOperatorChange}
              showLabel={false}
            />
          </Col>
          {getDynamicInputField()}
          <Col
            xs={1}
            className={"my-auto d-flex"}
          >
            {getAddRuleButton(index)}
            {getDeleteRuleButton(index)}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

FieldQueryComponent.propTypes = {
  filter: PropTypes.object,
  onFieldChange: PropTypes.func,
  onOperatorChange: PropTypes.func,
  onValueChange: PropTypes.func,
  handleClose: PropTypes.func,
  onRemove: PropTypes.func,
  onAdd: PropTypes.func,
  operators: PropTypes.object,
  fields: PropTypes.object,
  isRemovable: PropTypes.bool,
  index: PropTypes.number,
};
export default FieldQueryComponent;
