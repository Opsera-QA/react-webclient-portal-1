import React from "react";
import PropTypes from "prop-types";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import InfoContainer from "components/common/containers/InfoContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";

function StandaloneObjectPropertyDisplayer(
  {
    mainTitle,
    object,
    className,
  }) {
  const getStandaloneTextField = (fieldName, value, index) => {
    return (
      <StandaloneTextFieldBase
        key={index}
        text={JSON.stringify(value)}
        label={fieldName}
      />
    );
  };

  const getObjectFields = (object) => {
    if (object == null || typeof object !== "object") {
      return null;
    }

    const objectKeys = Object.keys(object);

    if (!Array.isArray(objectKeys) || objectKeys.length === 0) {
      return null;
    }

    objectKeys.sort((objectKey1, objectKey2) => {
      const objectProperty1 = typeof object[objectKey1];
      const objectProperty2 = typeof object[objectKey2];

      if (objectProperty1 === "object" && objectProperty2 !== "object") {
        return 1;
      }

      if (objectKey1.toLowerCase() < objectKey2.toLowerCase()) {
        return -1;
      }

      if (objectKey1.toLowerCase() > objectKey2.toLowerCase()) {
        return 1;
      }

      return 0;
    });

    objectKeys.sort((objectKey1, objectKey2) => {
      const objectProperty1 = typeof object[objectKey1];
      const objectProperty2 = typeof object[objectKey2];

      if (objectProperty1 === "object" && objectProperty2 !== "object") {
        return 1;
      }

      if (objectKey1.toLowerCase() < objectKey2.toLowerCase()) {
        return -1;
      }

      if (objectKey1.toLowerCase() > objectKey2.toLowerCase()) {
        return 1;
      }

      return 0;
    });

    return objectKeys.map((fieldName, index) => {
      return parsedObjectIntoViewer(fieldName, object[fieldName], index);
    });
  };

  const parsedObjectIntoViewer = (fieldName, objectProperty, index) => {
    if (typeof objectProperty !== "object") {
      return getStandaloneTextField(fieldName, objectProperty, index);
    }

    return (
      <InfoContainer
        titleText={fieldName}
        className={"my-2"}
        key={index}
      >
        <div className={"m-3"}>
          {getObjectFields(objectProperty)}
        </div>
      </InfoContainer>
    );
  };

  if (hasStringValue(mainTitle) === true) {
    return (
      <InfoContainer
        titleText={mainTitle}
        className={className}
      >
        <div className={"m-3"}>
          {getObjectFields(object)}
        </div>
      </InfoContainer>
    );
  }

  return (
    <div className={className}>
      {getObjectFields(object)}
    </div>
  );
}

StandaloneObjectPropertyDisplayer.propTypes = {
  mainTitle: PropTypes.string,
  object: PropTypes.object,
  className: PropTypes.string,
};

export default StandaloneObjectPropertyDisplayer;