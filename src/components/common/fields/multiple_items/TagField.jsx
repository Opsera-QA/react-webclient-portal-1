import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {faTag} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function TagField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  // TODO: After all pipelines are updated to new tags, remove this.
  // Legacy tags are just strings
  const parseTags = () => {
    let tags = dataObject?.getData(fieldName);

    if (Array.isArray(tags) && tags.length > 0) {
      return tags.filter((tag) => {return typeof tag === "object" && tag.type != null && tag.value != null});
    }

    return [];
  };

  const getTags = () => {
    const parsedTags = parseTags();

    if (parsedTags.length === 0) {
      return <span>No Tags Applied</span>;
    }

    return (
      parsedTags.map((tag, i) => {
        return (
          <span key={i} className="mx-1 mb-1 badge badge-light tag-badge">
            <FontAwesomeIcon icon={faTag} fixedWidth className="mr-1"/>{`${capitalizeFirstLetter(tag?.type)}: ${tag.value}`}
          </span>
        );
      })
    );
  };

  return (
    <FieldContainer className={className}>
      <FieldLabel fieldName={fieldName} field={field}/>
      <span className="item-field">
        {getTags()}
      </span>
    </FieldContainer>
  );
}

TagField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default TagField;