import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import Model from "core/data_model/model";
import {accessTokenMetadata} from "components/user/user_settings/access_tokens/access-token-metadata";
import CreateButton from "components/common/buttons/saving/CreateButton";
import TextAreaClipboardField from "components/common/fields/clipboard/TextAreaClipboardField";
import {faKey} from "@fortawesome/pro-light-svg-icons";
import AccessTokenExpirationSelectInput
  from "components/common/list_of_values_input/users/access_tokens/AccessTokenExpirationSelectInput";
import AccessTokenScopeRadioInput
  from "components/common/list_of_values_input/users/access_tokens/AccessTokenScopeRadioInput";
import IconBase from "components/common/icons/IconBase";
import InfoContainer from "components/common/containers/InfoContainer";

function AccessTokenEditorPanel({ cancelTokenSource, loadData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState(new Model({...accessTokenMetadata.newObjectFields}, accessTokenMetadata, true));
  const [generatedToken, setGeneratedToken] = useState(undefined);

  const createToken = async () => {
    const response = await tokenActions.createToken(getAccessToken, cancelTokenSource, accessToken);
    setAccessToken({...new Model({...accessTokenMetadata.newObjectFields}, accessTokenMetadata, true)});

    if (response?.data) {
      setGeneratedToken(response?.data);
      return response;
    }

    throw "Could not generate token.";
  };

  if (accessToken == null) {
    return <></>;
  }

  return (
    <InfoContainer
      titleIcon={faKey}
      titleText={"Generate Personal Access Token"}
      className={"mb-2"}
    >
        <Row className="mx-0">
          <Col xs={12} md={6}>
            <TextInputBase dataObject={accessToken} setDataObject={setAccessToken} fieldName={"name"}/>
          </Col>
          <Col xs={12} md={6}>
            <AccessTokenExpirationSelectInput dataObject={accessToken} setDataObject={setAccessToken} fieldName={"expiration"}/>
          </Col>
          <Col md={12}>
            <AccessTokenScopeRadioInput dataObject={accessToken} setDataObject={setAccessToken}/>
          </Col>
          <Col md={12}>
            <Row className="mx-0">
              <div className="ml-auto">
                <CreateButton
                  icon={faKey}
                  addAnotherOption={false}
                  disable={!accessToken.checkCurrentValidity()}
                  recordDto={accessToken}
                  handleClose={loadData}
                  createRecord={createToken} size={"sm"}
                />
              </div>
            </Row>
          </Col>
          <Col md={12}>
            <TextAreaClipboardField
              className={"my-2 small-label-text"}
              allowResize={false}
              rows={3}
              textAreaValue={generatedToken}
              description={`Please note: This token will not be able to be accessed again.`}
            />
          </Col>
        </Row>
    </InfoContainer>
  );
}

AccessTokenEditorPanel.propTypes = {
  cancelTokenSource: PropTypes.object,
  loadData: PropTypes.func
};

export default AccessTokenEditorPanel;


