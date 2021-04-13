import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {faTag} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";

function TagField({dataObject, fieldName, className, showLabel}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  // TODO: After all pipelines are updated to new tags, remove this.
  // Legacy tags are just strings
  const parseTags = () => {
    let tags = dataObject?.getData(fieldName);

    if (Array.isArray(tags) && tags.length > 0) {
      return tags.filter((tag) => {return typeof tag === "object" && tag.type != null && tag.value != null;});
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
          <CustomBadge icon={faTag} className={""} badgeText={`${capitalizeFirstLetter(tag?.type)}: ${capitalizeFirstLetter(tag.value)}`} key={i} />
        );
      })
    );
  };

  return (
    <FieldContainer className={className}>
      <CustomBadgeContainer>
        <FieldLabel fieldName={fieldName} field={field} showLabel={showLabel}/>
        {getTags()}
      </CustomBadgeContainer>
    </FieldContainer>
  );
}

TagField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool
};

TagField.defaultProps = {
  fieldName: "tags"
};

export default TagField;