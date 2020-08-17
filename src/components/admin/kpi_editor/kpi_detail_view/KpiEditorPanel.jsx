import React, { useState, useEffect, useContext } from "react";
import {
  Button,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import tagEditorFormFields from "./kpi-form-fields.js";
import TextInput from "components/common/input/text-input";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToggleInput from "components/common/input/toggle-input";
import Multiselect from "react-widgets/lib/Multiselect";
import MultipleInput from "components/common/input/multiple-input";
import Modal from "components/common/modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import KpiActions from "../kpi-editor-actions";
import Loading from "components/common/loading";

const INITIAL_DATA = {
  "name": "",
  "description": "",
  "tool_identifier": [],
  "type": "",
  "active": true,
  "persona": ["manager","developer", "executive"]
};

function KpiEditorPanel({ kpiData, newTag, setKpiData, handleClose }) {
  const [error, setErrors] = useState("");
  const { getAccessToken } = useContext(AuthContext);
  const [formFieldList, updateFormFields ] = useState({ ...tagEditorFormFields });
  const [ changeMap, setChangeMap] = useState({});
  const [ formData, setFormData] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [toolList, setToolList] = useState([]);

  useEffect(() => {
    loadData(kpiData);
  }, []);

  const loadData = async (kpiData) => {
    setIsLoading(true);
    getToolList();
    await unpackKpiData(kpiData);
    setIsLoading(false);
  };

  const unpackKpiData = async (kpiData) => {
    console.log(kpiData);
    if (kpiData != null) {
      setFormField("name", kpiData["name"] != null ? kpiData["name"] : "");
      setFormField("description", kpiData["description"] != null ? kpiData["description"] : "");
      setFormField("active", kpiData["active"] != null ? kpiData["active"] : false);
      setFormField("tool_identifier", kpiData["tool_identifier"] != null ? kpiData["tool_identifier"] : []);
    }
    setIsLoading(false);
  };

  const setFormField = (field, value) => {
    if (value === kpiData[field])
    {
      delete changeMap[field];
    }
    else
    {
      changeMap[field] = value;
      setChangeMap({ ...changeMap });
    }
    formData[field] = value;
    setFormData({ ...formData });
    if (newTag)
    {
      kpiData[field] = value;
      setKpiData({ ...kpiData });
    }
  };

  //TODO: Check fields
  const isFormValid = true;

  const createKpi = async (newFormData) => {
    if(isFormValid) {
      let kpiResponse = await KpiActions.create(newFormData, getAccessToken);
      if (kpiResponse.error != null) {
        setErrors("Cannot create KPI configuration");
      }
      else {
        handleClose();
      }
    }
  };

  const updateKpi = async (newKpiData) => {
    if(isFormValid) {
      try {
        const response = await KpiActions.update(newKpiData._id, changeMap, getAccessToken);
        setKpiData({ ...response.data });
        setChangeMap({});
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };


  const getToolList = async () => {
    const response = await KpiActions.getTools(getAccessToken);
    setToolList(response.data)
  }

  const setTool = (value) => {
    let identifier_list = value.reduce((acc, item) => {
        acc.push(item.identifier);
        return acc;
      }, []);
    setFormField("tool_identifier", [ ...identifier_list])
  };

  return (
    <>
      {isLoading ? <Loading size="sm" /> : null}

      {!isLoading && <>
        <div className="scroll-y full-height">
          {error.length > 0 && <>
            <div className="pb-2 error-text">WARNING! An error has occurred saving your configuration: {error}</div>
          </>}
          <Row>
            <Col>
              <TextInput field={formFieldList.name} setData={setFormField} formData={formData}/>
            </Col>
            <Col>
              <ToggleInput field={formFieldList.active} setData={setFormField} formData={formData} />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput field={ formFieldList.description } setData={setFormField} formData={formData}/>
            </Col>
            <Col>
             <div className="custom-text-input form-group">
              <label><span>Tool Identifier</span></label> 
              <Multiselect
                data={toolList} 
                className="basic-multi-select"
                valueField="identifier"
                textField="name"
                placeholder="Select One"
                defaultValue={formData["tool_identifier"]}
                onChange={setTool}           
              />
             </div>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto px-3">
              {newTag ? <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0} onClick={() => createKpi(kpiData)}>Create KPI</Button>
                : <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0} onClick={() => updateKpi(kpiData)}>Save changes</Button>
              }
            </div>
          </Row>
        </div>
      </>}
    </>
  );
}

KpiEditorPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func,
  canDelete: PropTypes.bool,
  newTag: PropTypes.bool,
  handleClose: PropTypes.func
};

KpiEditorPanel.defaultProps = {
  newTag: false
};

export default KpiEditorPanel;


