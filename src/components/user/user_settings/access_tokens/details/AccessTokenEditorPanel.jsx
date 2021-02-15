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
import {faKey, faKeySkeleton} from "@fortawesome/pro-light-svg-icons";
import AccessTokenExpirationSelectInput
  from "components/common/list_of_values_input/users/access_tokens/AccessTokenExpirationSelectInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function AccessTokenEditorPanel({ cancelTokenSource }) {
  const { getAccessToken } = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState(new Model({...accessTokenMetadata.newObjectFields}, accessTokenMetadata, true));
  const [generatedToken, setGeneratedToken] = useState(undefined);

  const createToken = async () => {
    const response = await tokenActions.createToken(getAccessToken, cancelTokenSource, accessToken);
    console.log("response: " + JSON.stringify(response));
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
    <div>
      <div>
        <div><strong>Personal Access Tokens</strong></div>
        <div>You can generate multiple personal access tokens with unique expiration dates in order to interact with the
          Opsera API.
        </div>
        <div className="object-properties-input my-3">
          <div className="content-container-border">
            <div className="my-auto property-header d-flex justify-content-between">
              <h6>
                <div className="mx-2">
                  <div className="pt-2">
                    <FontAwesomeIcon icon={faKeySkeleton} fixedWidth className="mr-2"/>
                    Generate a new Personal Access Token
                  </div>
                </div>
              </h6>
            </div>
          <Row className="mx-0 pb-3 pt-1">
            <Col xs={12} md={6}>
              <div>
                <TextInputBase dataObject={accessToken} setDataObject={setAccessToken} fieldName={"name"}/>
              </div>
              <div>
                <AccessTokenExpirationSelectInput dataObject={accessToken} setDataObject={setAccessToken}
                                                  fieldName={"expiration"}/>
              </div>
              <div>
                <TextInputBase dataObject={accessToken} setDataObject={setAccessToken} fieldName={"scope"}/>
              </div>
              <div className="mt-3">
                <CreateButton icon={faKey} addAnotherOption={false} disable={!accessToken.isModelValid2()}
                              recordDto={accessToken} createRecord={createToken} size={"md"}/>
              </div>
            </Col>
            <Col xs={12} md={6} className="mt-auto">
              <TextAreaClipboardField
                allowResize={false}
                className={"mt-2"}
                rows={7}
                textAreaValue={generatedToken}
                description={`Please note: This token will not be able to be accessed again.`}
              />
            </Col>
          </Row>
        </div>
        </div>
      </div>
    </div>
  );
}

AccessTokenEditorPanel.propTypes = {
  cancelTokenSource: PropTypes.object,
};

export default AccessTokenEditorPanel;


