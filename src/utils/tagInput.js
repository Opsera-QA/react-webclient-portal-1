import React, { useContext, useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

function TagInput(props) {
  let defaultTag = props.defaultValue;
  const [ tags, setTags ] = useState( defaultTag || []);
  const [ tagInput, setTagInput ] = useState("");

  useEffect(() => {
    props.onChange(tags);
  }, [tags]);

  const removeTag = (i) => {
    tags.splice(i, 1);
    setTags([...tags]);
  };

  const addTag = () => {
    if (tagInput) {
      if (tags.find(tag => tag.toLowerCase() === tagInput.toLowerCase())) {
        return;
      }
      setTags([...tags, tagInput]);
      setTagInput("");
    }else  return;
  };

  const inputKeyDown = (e) => {
    e.stopPropagation();
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      setTagInput("");
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {tags.map((tag, i) => (
          <Button key={tag}variant="outline-secondary" style={{ marginRight: 10, marginBottom: 10 }} size="sm">
            {tag} 
            <span style={{ marginLeft: 5 }} onClick={() => { removeTag(i); }}><FontAwesomeIcon icon={faTimes} fixedWidth/></span>
          </Button>
        ))}
      </div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Add tag and press enter"
          value={tagInput}
          tabIndex="0"
          onChange={e => setTagInput(e.target.value)} 
          onKeyDown={inputKeyDown}
        />
        <Button variant="primary" size="sm" onClick={addTag} className="ml-3"><FontAwesomeIcon icon={faPlus} /></Button>
      </InputGroup>
    </div>
  );

}

TagInput.propTypes = {
  defaultValue: PropTypes.array,
  onChange: PropTypes.func
};

export default TagInput;
