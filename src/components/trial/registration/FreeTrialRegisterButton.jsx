import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";

export default function FreeTrialRegisterButton(
  {
    registrationModel,
    registerAccountFunction,
    className,
    disabled,
  }) {
  const [registeringAccount, setRegisteringAccount] = useState(false);
  const { toastContext, isMounted, cancelTokenSource } = useComponentStateReference();

  const createFreeTrialAccount = async () => {
    try {
      setRegisteringAccount(true);
      // TODO: Wire up
      registerAccountFunction();
      // await persistNewRecord(
      //   registrationModel,
      //   toastContext,
      //   false,
      //   registerAccountFunction,
      // );
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted.current === true) {
        setRegisteringAccount(false);
      }
    }
  };

  const getLabel = () => {
    if (registeringAccount) {
      return ("Registering Account...");
    }

    return ("Continue");
  };

  if (registrationModel == null || registerAccountFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <Button
        variant={"success"}
        id={"register-account-button"}
        disabled={
          registeringAccount
          || disabled === true
          // || !registrationModel.checkCurrentValidity() // TODO: Enable when actually wiring up registration. Disabled for now to get to Congratulations screen
        }
        onClick={createFreeTrialAccount}
      >
        <span>
          <IconBase
            icon={faArrowRight}
            isLoading={registeringAccount}
            className={"mr-2"}
          />
          {getLabel()}
        </span>
      </Button>
    </div>
  );
}

FreeTrialRegisterButton.propTypes = {
  registrationModel: PropTypes.object,
  registerAccountFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  lenient: PropTypes.bool,
};

FreeTrialRegisterButton.defaultProps = {
  showSuccessToasts: true,
};