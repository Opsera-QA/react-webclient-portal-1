import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import xml from "react-syntax-highlighter/dist/cjs/languages/hljs/xml";
import docco from "react-syntax-highlighter/dist/cjs/styles/hljs/docco";
import {_xmlFormattingHelper} from "components/common/helpers/code-helpers";
import ErrorDialog from "components/common/status_notifications/error";
import InfoContainer from "components/common/containers/InfoContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { hasStringValue } from "components/common/helpers/string-helpers";

SyntaxHighlighter.registerLanguage("xml", xml);

// TODO: If we can format the data with the new library, we should switch to doing that instead.
function StandalonePackageXmlFieldBase({xml, title, errorMessage, className, isLoading}) {
  const isMounted = useRef(false);
  const [formattedXml, setFormattedXml] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    isMounted.current = true;

    setFormattedXml(undefined);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, [xml]);

  const loadData = async () => {
    try {
      const formattedXml = _xmlFormattingHelper(xml);
      setFormattedXml(formattedXml);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };


  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator />
      );
    }

    if (hasStringValue(errorMessage) === "true") {
      return (
        <CenteredContentWrapper>
          <ErrorDialog error={errorMessage}/>
        </CenteredContentWrapper>
      );
    }

    if (error !== "") {
      return (
        <CenteredContentWrapper>
          <ErrorDialog error={error}/>
        </CenteredContentWrapper>
      );
    }

    if (formattedXml == null) {
      return (
        <CenteredContentWrapper>
          XML could not be formatted
        </CenteredContentWrapper>
      );
    }

    return (
      <SyntaxHighlighter
        language={"xml"}
        style={docco}
      >
        {formattedXml}
      </SyntaxHighlighter>
    );
  };

  return (
    <InfoContainer
      minimumHeight={"150px"}
      maximumHeight={"500px"}
      titleText={title}
      isLoading={isLoading}
      titleIcon={faFileCode}
      className={className}
    >
      {getBody()}
    </InfoContainer>
  );
}

StandalonePackageXmlFieldBase.propTypes = {
  xml: PropTypes.any,
  title: PropTypes.string,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

StandalonePackageXmlFieldBase.defaultProps = {
  className: "my-2"
};

export default StandalonePackageXmlFieldBase;