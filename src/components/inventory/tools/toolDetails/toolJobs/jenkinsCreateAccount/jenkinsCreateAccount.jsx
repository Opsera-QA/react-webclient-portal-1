import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "components/inventory/tools/tools.css";

import jenkinsCreateAccountFormFields from "./jenkins-create-account-form-fields.js";
import DropdownList from "react-widgets/lib/DropdownList";
import {capitalizeFirstLetter} from "../../../../../common/helpers/string-helpers";


function JenkinsCreateAccount(props) {
  const { toolId, toolData, accessToken } = props;
  const [ platformType, setPlatformType ] = useState("");
  const [ accountList, setAccountList ] = useState([]);
  const [ account, setAccount ] = useState(undefined);
  const [accountUserName, setAccountUserName] = useState("");
  const [ jenkinsCreateAccountFormList, updateJenkinsCreateAccountForm] = useState({ ...jenkinsCreateAccountFormFields });

  const platformList = [
    {
      label: "GitLab",
      value: "gitlab"
    },
    {
      label: "GitHub",
      value: "github"
    },
    {
      label: "Bitbucket",
      value: "bitbucket"
    },
  ];


  const updatePlatform = (data) => {
    setPlatformType(data)
    getPlatformData(data);
  }

  const updateAccount = (data) => {
    console.log("update account: " + JSON.stringify(data));
    setAccount(data);
    getAccountData(data)
  }

  const getPlatformData = async (data) => {
    try {
      const platformResponse = await axiosApiService(accessToken).get("/registry/properties/" + data, {});
      console.log("Platform Response: " + JSON.stringify(platformResponse));
      let accountList = [];

      platformResponse.data.map(account => {
        // console.log("account.configuration: " + JSON.stringify(account.configuration));
        // console.log("account.configuration.accountUsername: " + JSON.stringify(account.configuration.accountUsername));
        if (account.configuration != null && account.configuration.accountUsername != null) {
          console.log("account.configuration: " + JSON.stringify(account.configuration));
          accountList.push(account);
        }
      });


      let newAccount = accountList.length > 0 ? accountList[0] : undefined;

      if (newAccount != null)
      {
        console.log("new account: " + JSON.stringify(newAccount));
        setAccount(newAccount);
        getAccountData(newAccount);
      }

      setAccountList(accountList);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const getAccountData = (account) => {
    console.log("account: " + JSON.stringify(account));
    setAccountUserName(account.configuration.accountUsername);
  };

  const handleFormChange = (jenkinsFormList, value) => {
    let validateInput = {
      errorMessage: "",
      touched: true, 
      isValid: true,
      value: value
    };
    updateJenkinsCreateAccountForm(prevState => ({ 
      ...prevState, 
      [jenkinsFormList.id]: { 
        ...prevState[jenkinsFormList.id],
        ...validateInput
      } 
    }));
  };

  const formFieldType = (formField) => {
    switch (formField.type) {   
    case "select":
      return <Form.Control as="select" disabled={formField.disabled} value={formField.value} onChange={e => handleFormChange(formField, e.target.value)}>
        <option name="Select One" value="" disabled={true}>Select One</option>
        {formField.options.map((option, i) => (
          <option key={i} value={option.value}>{option.name}</option>
        ))} 
      </Form.Control>;    
    default:
      return  <Form.Control value={formField.value} disabled={formField.disabled} isInvalid={formField.touched && !formField.isValid} onChange={e => handleFormChange(formField, e.target.value)} />;
    }
  };

  const createJob = async () => {
    let formData = Object.keys(jenkinsCreateAccountFormList).reduce((obj, item) => Object.assign(obj, { [item]: jenkinsCreateAccountFormList[item].value }), {});
    let payload = {
      service: platformType,
      credentailsToolId: account._id,
      accountUserName: accountUserName,
      ...formData
    };
    try {
      const response = await axiosApiService(accessToken).post("/registry/action/"+ toolId + "/createcredential", { ...payload });
      props.setJobAction("");
    }
    catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Form className="newToolFormContainer">
        <Form.Group controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Platform
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control as="select" disabled={false} value={platformType} onChange={e => updatePlatform( e.target.value)}>
              <option name="Select One" value="" disabled={true}>Select One</option>
              {platformList.map((option, i) => (
                <option key={i} value={option.value}>{option.label}</option>
              ))} 
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Select Account
          </Form.Label>
          <Col sm="9" className="text-right">
            <DropdownList
              data={accountList}
              textField='name'
              filter='contains'
              value={account}
              onChange={updateAccount}
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Account
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control value={accountUserName} disabled={true}/>
          </Col>
        </Form.Group>
      </Form>
      <Form className="newToolFormContainer">
        
        <br />
        {Object.values(jenkinsCreateAccountFormList).map((formField, i) => {
          if(formField.toShow ) {
            return(
              <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
                <Form.Label column sm="3">
                  {formField.label} 
                  {formField.rules.isRequired && <span style={{ marginLeft:5, color: "#dc3545" }}>*</span>}
                </Form.Label>
                <Col sm="9" className="text-right">
                  {formFieldType(formField)}
                  <Form.Control.Feedback type="invalid">{formField.errorMessage}</Form.Control.Feedback>
                </Col>
              </Form.Group>
            );
          }
        })}
      </Form>
      <div className="text-right m-2">
        <Button size="sm" variant="secondary" onClick={() => props.setJobAction("")} className="mr-2"> Cancel</Button>
        <Button size="sm" variant="primary" onClick={createJob}><FontAwesomeIcon icon={faSave} fixedWidth /> Save</Button>
      </div>
    </>
  );
}

JenkinsCreateAccount.propTypes = {
  jobAction: PropTypes.string,
  toolData: PropTypes.object,
  accessToken: PropTypes.string,
  setJobAction: PropTypes.func
};


export default JenkinsCreateAccount;
