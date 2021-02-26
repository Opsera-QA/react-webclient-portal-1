import React, {useContext} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faTag} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function TagsCloudBase({ tags, onTagClick }) {

  const getTagCloud = () => {
    return (
      <Row className="item-field">
        {tags.map((tag) => {
          return (
            <span key={tag?._id} className="mx-1 mb-1 badge badge-light tag-badge pointer" onClick={() => {onTagClick(tag)}}>
              <FontAwesomeIcon icon={faTag} fixedWidth className="mr-1"/>{`${capitalizeFirstLetter(tag?.type)}: ${tag?.value}`}
            </span>
          );
        })}
      </Row>
    );
  };


  // TODO: pass in no tags message
  if (tags == null || tags.length === 0) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No Tags Found</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      {getTagCloud()}
    </div>
  );
}

TagsCloudBase.propTypes = {
  tags: PropTypes.array,
  onTagClick: PropTypes.func
};

export default TagsCloudBase;