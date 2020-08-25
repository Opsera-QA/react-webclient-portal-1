import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import analyticsUserFormFields from "./registered-user-form-fields.js";
import TextInput from "components/common/input/text-input";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToggleInput from "components/common/input/toggle-input";
import RegisteredUserActions from "../registered-user-actions";
import Loading from "components/common/status_notifications/loading";
import Multiselect from "react-widgets/lib/Multiselect";

const INITIAL_DATA = {
  "Infrastructure": false,
  "Pipeline": false,
  "defaultPersona": "",
  "analyticsServerUrl" : "",
  "hitsIndex": "",
  "dataUsage": "",
  "active": true,
  "allowData": false,     
  "enabledTools": []
};

function RegisteredUserEditorPanel({ userData, setUserData, handleClose }) {
  const [error, setErrors] = useState("");
  const { getAccessToken } = useContext(AuthContext);
  const [formFieldList, updateFormFields ] = useState({ ...analyticsUserFormFields });
  const [ changeMap, setChangeMap] = useState({});
  const [ formData, setFormData] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [toolList, setToolList] = useState([]);

  useEffect(() => {
    loadData(userData);
  }, []);

  const loadData = async (userData) => {
    setIsLoading(true);
    getToolList();
    await unpackKpiData(userData);
    setIsLoading(false);
  };

  const unpackKpiData = async (userData) => {
    if (userData != null) {
      setFormField("enabledTools", userData["enabledTools"] != null ? userData["enabledTools"] : []);

      setFormField("defaultPersona", userData["defaultPersona"] != null ? userData["defaultPersona"] : "");
      setFormField("analyticsServerUrl", userData["analyticsServerUrl"] != null ? userData["analyticsServerUrl"] : "");
      setFormField("hitsIndex", userData["hitsIndex"] != null ? userData["hitsIndex"] : "");
      setFormField("dataUsage", userData["dataUsage"] != null ? userData["dataUsage"] : "");

      setFormField("active", userData["active"] != null ? userData["active"] : false);
      setFormField("allowData", userData["allowData"] != null ? userData["allowData"] : false);
      setFormField("Pipeline", userData.workflowType["Pipeline"] != null ? userData.workflowType["Pipeline"] : false);
      setFormField("Infrastructure", userData.workflowType["Infrastructure"] != null ? userData.workflowType["Infrastructure"] : false);
    }
    setIsLoading(false);
  };

  const setFormField = (field, value) => {
    if (value === userData[field])
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
  };

  //TODO: Check fields
  const isFormValid = true;

  const updateProfile = async () => {
    let payload = {
      workflowType: {
        "Infrastructure": formData.Infrastructure,
        "Pipeline": formData.Pipeline,
      },
      enabledTools: formData.enabledTools,
      defaultPersona: formData.defaultPersona,
      analyticsServerUrl: formData.analyticsServerUrl,
      hitsIndex: formData.hitsIndex,
      dataUsage: formData.dataUsage,
      active: formData.active,
      allowData: formData.allowData,
    };
  
    if(isFormValid) {
      try {
        const response = await RegisteredUserActions.update(userData._id, payload, getAccessToken);
        setUserData({ ...response.data });
        setChangeMap({});
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };


  const getToolList = async () => {
    const response = await RegisteredUserActions.getTools(getAccessToken);
    setToolList(response.data)
  }

  const setTool = (value) => {
    let identifier_list = value.reduce((acc, item) => {
        acc.push(item.identifier);
        return acc;
      }, []);
    setFormField("enabledTools", [ ...identifier_list])
  };

  return (
    <>
          <Row>
            <Col>
              <div className="custom-text-input form-group">
              <label><span>Enabled Tools</span></label> 
              <Multiselect
                data={toolList} 
                className="basic-multi-select"
                valueField="identifier"
                textField="name"
                placeholder="Select One"
                defaultValue={formData["enabledTools"]}
                onChange={setTool}           
              />
             </div>
            </Col>             
            <Col>
              <TextInput field={formFieldList.dataUsage} setData={setFormField} formData={formData}/>
            </Col>         
            <Col>
              <TextInput field={formFieldList.hitsIndex} setData={setFormField} formData={formData}/>
            </Col>                      
          </Row>
          <Row>
            <Col>
              <TextInput field={formFieldList.analyticsServerUrl} setData={setFormField} formData={formData}/>
            </Col>  
            <Col>
              <TextInput field={formFieldList.defaultPersona} setData={setFormField} formData={formData}/>
            </Col>             
          </Row>
          <Row>
            <Col>
              <ToggleInput field={formFieldList.allowData} setData={setFormField} formData={formData} />
            </Col>
            <Col>
              <ToggleInput field={formFieldList.active} setData={setFormField} formData={formData} />
            </Col>
          </Row>          
          <Row>
            <Col>
              <ToggleInput field={formFieldList.Infrastructure} setData={setFormField} formData={formData} />
            </Col>
            <Col>
              <ToggleInput field={formFieldList.Pipeline} setData={setFormField} formData={formData} />
            </Col>
          </Row>
          <Row>
            <div className="ml-auto px-3">
             <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0} onClick={() => updateProfile()}>Save changes</Button>
            </div>
          </Row>
    </>
  );
}

RegisteredUserEditorPanel.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  canDelete: PropTypes.bool,
  handleClose: PropTypes.func
};

export default RegisteredUserEditorPanel;


