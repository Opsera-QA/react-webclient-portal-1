import React, {useState, useEffect, useContext} from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import "components/inventory/tools/tools.css";

import {platformList} from "./jenkins-create-account-metadata";
import DropdownList from "react-widgets/lib/DropdownList";
import TextField from "../../../../../../common/form_fields/text-field";
import {AuthContext} from "../../../../../../../contexts/AuthContext";
import Loading from "../../../../../../common/loading";
import DtoTextInput from "../../../../../../common/input/dto_input/dto-text-input";
import DtoTextField from "../../../../../../common/form_fields/dto_form_fields/dto-text-field";


function JenkinsAccountEditorPanel({ toolData, jenkinsAccountData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [ platformType, setPlatformType ] = useState("");
  const [jenkinsAccountDataDto, setJenkinsAccountDataDto] = useState(undefined);
  const [ accountList, setAccountList ] = useState([]);
  const [ account, setAccount ] = useState(undefined);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setJenkinsAccountDataDto(jenkinsAccountData);
    setIsLoading(false);
  };

  const updatePlatform = (platform) => {
    setPlatformType(platform["value"])
    getPlatformData(platform["value"]);
  }

  const updateAccount = (data) => {
    setAccount(data);
  }

  const getPlatformData = async (data) => {
    try {
      const platformResponse = await axiosApiService(getAccessToken).get("/registry/properties/" + data, {});
      let accountList = [];

      platformResponse.data.map(account => {
        if (account.configuration != null && account.configuration.accountUsername != null) {
          accountList.push(account);
        }
      });

      let newAccount = accountList.length > 0 ? accountList[0] : undefined;

      if (newAccount != null)
      {
        setAccount(newAccount);
      }

      setAccountList(accountList);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const createJenkinsAccount = async () => {
    let payload = {
      service: platformType,
      credentailsToolId: account._id,
      accountUserName: account.configuration.accountUsername,
      ...jenkinsAccountDataDto.getPersistData()
    };
    try {
      const response = await axiosApiService(getAccessToken).post("/registry/action/"+ toolData["_id"] + "/createcredential", { ...payload });
      console.log("Response from server: " + JSON.stringify(response));
      handleClose();
    }
    catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {isLoading ? <Loading size="sm" /> :
      <div className="scroll-y full-height">
        <Row>
          <Col lg={12}>
            <Form.Group controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
              <Form.Label column sm="4">
                Platform
              </Form.Label>
              <Col sm="8" className="text-right">
                  <DropdownList
                    data={platformList}
                    textField='label'
                    filter='contains'
                    value={platformType}
                    onChange={updatePlatform}
                  />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={12}>
            <Form.Group controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
              <Form.Label column sm="4">
                Select Account
              </Form.Label>
              <Col sm="8" className="text-right">
                <DropdownList
                  data={accountList}
                  textField='name'
                  filter='contains'
                  value={account}
                  onChange={updateAccount}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col lg={12}>
            <DtoTextInput fieldName={"credentialsId"} dataObject={jenkinsAccountDataDto} setDataObject={setJenkinsAccountDataDto} />
          </Col>
          <Col lg={12}>
            <DtoTextInput fieldName={"credentialsDescription"} dataObject={jenkinsAccountDataDto} setDataObject={setJenkinsAccountDataDto} />
          </Col>
          <Col lg={12}>
            <div className="">
              <div className="py-3 mx-3">
                <div className="custom-text-input"><label>Account</label><span>{account && account.configuration.accountUsername}</span></div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="text-right m-2">
          <Button size="sm" variant="primary" onClick={createJenkinsAccount}>
            <FontAwesomeIcon icon={faSave} fixedWidth/>Add Credentials
          </Button>
        </div>
      </div>}
    </>
  );
}

JenkinsAccountEditorPanel.propTypes = {
  toolData: PropTypes.object,
  jenkinsAccountData: PropTypes.object,
  handleClose: PropTypes.func,
};


export default JenkinsAccountEditorPanel;
