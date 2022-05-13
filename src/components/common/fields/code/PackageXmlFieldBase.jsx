import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import FieldTitleBar from "components/common/fields/FieldTitleBar";
import InputContainer from "components/common/inputs/InputContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import xml from "react-syntax-highlighter/dist/cjs/languages/hljs/xml";
import docco from "react-syntax-highlighter/dist/cjs/styles/hljs/docco";
import ErrorDialog from "components/common/status_notifications/error";
import {_xmlFormattingHelper} from "components/common/helpers/code-helpers";

SyntaxHighlighter.registerLanguage("xml", xml);

// TODO: If we can format the data with the new library, we should switch to doing that instead.
function PackageXmlFieldBase({model, fieldName, className, isLoading}) {
  const [field] = useState(model?.getFieldById(fieldName));
  const isMounted = useRef(false);
  const [formattedXml, setFormattedXml] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      const formattedXml = _xmlFormattingHelper(model.getData(fieldName));
      setFormattedXml(formattedXml);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };


  const getBody = () => {
    if (isLoading === true) {
      return (
        <div className={"h-100 w-100 d-flex"}>
          <div className={"m-auto w-100"}>
            <LoadingDialog size={"sm"} message={"Loading Data"} />
          </div>
        </div>
      );
    }

    if (error !== "") {
      return (
        <div className={"h-100 w-100 d-flex"}>
          <div className={"m-auto w-100"}>
            <ErrorDialog error={error}/>
          </div>
        </div>
      );
    }

    if (formattedXml == null) {
      return (
        <div className={"h-100 w-100 d-flex"}>
          <div className={"m-auto w-100"}>
            XML could not be formatted
          </div>
        </div>
      );
    }

    return (
      <SyntaxHighlighter language="xml" style={docco}>
        {formattedXml}
      </SyntaxHighlighter>
    );
  };

  if (field == null) {
    return null;
  }

  //TODO: Make css classes for body after finalizing
  return (
    <InputContainer className={className} fieldName={fieldName}>
      <div className="object-properties-input">
        <div className="content-container">
          <FieldTitleBar field={field} icon={faFileCode} isLoading={isLoading} />
          <div style={{height: "500px", maxHeight: "500px", overflowY: "auto"}}>
            {getBody()}
          </div>
        </div>
      </div>
      <div className={"object-properties-footer"} />
    </InputContainer>
  );
}

PackageXmlFieldBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default PackageXmlFieldBase;