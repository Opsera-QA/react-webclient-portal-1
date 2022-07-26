import React, { useContext, useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { freeTrialRegistrationMetadata } from "components/trial/freeTrialRegistration.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import userActions from "components/user/user-actions";
import RegisterButton from "components/common/buttons/saving/RegisterButton";
import PasswordInput from "components/common/inputs/text/PasswordInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import PropTypes from "prop-types";
import FreeTrialRegistrationWelcomeScreen from "components/trial/registration/FreeTrialRegistrationWelcomeScreen";

const FreeTrialRegistrationSelectSignupOptionScreen = ({ registrationModel, setRegistrationModel}) => {
  return (
    <div>
      Select Signup option
    </div>
  );
};

FreeTrialRegistrationSelectSignupOptionScreen.propTypes = {
  registrationModel: PropTypes.object,
  setRegistrationModel: PropTypes.func,
};

export default FreeTrialRegistrationSelectSignupOptionScreen;
