import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RuleTypeSelectInput from "components/common/list_of_values_input/workflow/wizard/rules/RuleTypeSelectInput";
import RuleValueMultiSelectInput
  from "components/common/list_of_values_input/workflow/wizard/rules/RuleValueSelectInput";
import RuleFieldSelectInput from "components/common/list_of_values_input/workflow/wizard/rules/RuleFieldSelectInput";
import RuleComponentRangeSelectInput
  from "components/common/list_of_values_input/workflow/wizard/rules/RuleComponentRangeSelectInput";
import Model from "core/data_model/model";
import sfdcRuleMetadata from "components/common/inputs/rules/sfdc_pipeline_wizard/sfdc-rule-metadata";

function SfdcRuleInput({ruleData, index, addRule, deleteRule, updateRule}) {
  const [ruleModel, setRuleModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [index]);

  const loadData = () => {
    let newModel = new Model({...ruleData}, sfdcRuleMetadata, false);
    setRuleModel({...newModel});
  };

  const updateData = (newModel) => {
    setRuleModel(newModel);
    updateRule(index, newModel.getPersistData());
  };

  const getDeleteRuleButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteRule(index)}>
        <span><FontAwesomeIcon className="danger-red" icon={faTimes} fixedWidth/></span>
      </Button>
    );
  };

  const getAddRuleButton = (index) => {
    return (
      <Button variant="link" onClick={() => addRule(index)}>
        <span><FontAwesomeIcon className="opsera-primary" icon={faPlus} fixedWidth/></span>
      </Button>
    );
  };

  if (ruleModel == null) {
    return null;
  }

  return (
    <Row className="d-flex mx-2 justify-content-between" key={index}>
      <Col sm={11} className={"px-0"}>
        <Row className={"mx-0"}>
          <Col xs={3} className={""}>
            <RuleTypeSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} />
          </Col>
          <Col xs={3}>
            <RuleComponentRangeSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} />
          </Col>
          <Col xs={3}>
            <RuleFieldSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} />
          </Col>
          <Col xs={3}>
            <RuleValueMultiSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} />
          </Col>
          {/*<Col>*/}
          {/*  <RuleComparisonSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} />*/}
          {/*</Col>*/}
        </Row>
      </Col>
      <Col xs={1} className={"my-auto d-flex"}>
        {getAddRuleButton(index)}
        {getDeleteRuleButton(index)}
      </Col>
    </Row>
  );
}

SfdcRuleInput.propTypes = {
  ruleData: PropTypes.object,
  index: PropTypes.string,
  addRule: PropTypes.func,
  deleteRule: PropTypes.func,
  updateRule: PropTypes.func
};

export default SfdcRuleInput;