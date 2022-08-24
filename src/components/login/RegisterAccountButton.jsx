import React from 'react';
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import { hasStringValue } from "components/common/helpers/string-helpers";

const DEFAULT_TENANT = "opsera.io";

function RegisterAccountButton() {
  const history = useHistory();

  const gotoSignUp = () => {
    history.push("/trial/registration");
    //history.go(0);
  };

  const goToLdapSignupForm = () => {
    const tenant = process.env.REACT_APP_OPSERA_TENANT;
    const accountRegistrationPath = `account/registration`;
    history.push(`/${accountRegistrationPath}/${tenant}`);
    history.go(0);
  };

  const getButton = () => {
    const tenant = String(process.env.REACT_APP_OPSERA_TENANT);

    if (hasStringValue(tenant) === true && tenant !== DEFAULT_TENANT) {
      return (
        <Button
          variant={"primary"}
          className={"btn-lg w-100 mb-3"}
          onClick={() => goToLdapSignupForm()}
        >
          Add User To Account
        </Button>
      );
    }

    return (
      <Button
        variant={"success"}
        className={"btn-lg w-100 mb-3"}
        onClick={gotoSignUp}
      >
        Get Started!
      </Button>
    );
  };

  return (
    <div className="col-md px-2">
      {getButton()}
    </div>
  );
}

export default RegisterAccountButton;