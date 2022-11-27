import React  from "react";
import LoginForm from "components/login/LoginForm";
import { Route } from "react-router-dom";
import { LoginCallback } from "@okta/okta-react";
import Home from "components/home/Home";
import Logout from "components/login/Logout";
import About from "components/about/About";
import Pricing from "components/about/Pricing";
import OnlineHelp from "components/about/Help";
import Signup from "components/user/signup/Signup";
import Registration from "components/landing/Registration";
import AccountRegistration from "components/user/account_registration/AccountRegistration";
import AwsAccountRegistration from "components/user/aws_registration/AwsAccountRegistration";
import Faq from "components/about/faq/Faq";
import HelpDocumentationScreen from "components/about/help_documentation/HelpDocumentationScreen";
import PropTypes from "prop-types";
import FreeTrialRegistration from "components/trial/registration/FreeTrialRegistration";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function PublicRoutes(
  {
    authClient,
  }) {
  const {
    isFreeTrial,
  } = useComponentStateReference();

  const getSignupScreen = () => {
    if (isFreeTrial === true) {
      return (
        <Route
          path="/trial/registration"
          exact
          component={FreeTrialRegistration}
        />
      );
    }

    return (
      <>
        <Route path="/signup" exact component={Signup} />
        <Route path="/registration" exact component={Registration} />
        <Route path="/account/registration/:domain" exact component={AccountRegistration} />
        <Route path="/signup/awsmarketplace/:customerId" exact component={AwsAccountRegistration} />
      </>
    );
  };

  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/login" render={() => <LoginForm authClient={authClient} />} />
      <Route path="/implicit/callback" component={LoginCallback} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/faq" exact component={Faq} />
      <Route path="/help-documentation" exact component={HelpDocumentationScreen} />
      <Route path="/about" exact component={About} />
      <Route path="/about/pricing" component={Pricing} />
      <Route path="/help" component={OnlineHelp} />
      {getSignupScreen()}
    </>
  );
}

PublicRoutes.propTypes = {
  authClient: PropTypes.object,
};

