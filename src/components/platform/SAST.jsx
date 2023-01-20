import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

function SAST(props) {

  const { data, setState, handleCancel } = useContext(NewAppContext);
  const { tools } = props;
  const [isChecked, setCheckbox] = useState({
    SonarQube: tools.includes("SonarQube") ? true : false
  });

  useEffect(() => {
    setCheckbox({ 
      SonarQube: false
    });
    if(tools.length > 0) {
      tools.map((tool) => {
        if(isChecked[tool] !== undefined) {
          setCheckbox({ 
            ...isChecked, 
            [tool] : true 
          });
        }
      });
    }
  }, [tools]);

  const selectCard = (serviceType) => {
    //On each click, check if it's already selected 
    if(isChecked[serviceType] ) {
      //de-select the checkbox
      setCheckbox({ 
        ...isChecked, 
        [serviceType] : false
      });
      //remove the entry from master dataset ( data from context here )
      // delete data[serviceType];
      handleCancel();
    }else {
      //If it's a new selection, select the checkbox, show the modal and update the dataset (data from context here )
      setCheckbox({ 
        ...isChecked, 
        [serviceType] : true
      });
      setState({
        open: true,
        category: "SASST",
        service: serviceType,
      });
    }
  };

  return (
    <Card style={{ minWidth: "16rem" }}>
      <Card.Body className="text-center">
        <Card.Title>Code Security</Card.Title>
          
        <div>
          <div
            className={`newApp__service-logo ${tools.includes("SonarQube") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() => selectCard("SonarQube")}
          >
            <input type="checkbox"
              disabled={tools.includes("SonarQube") ? true : false}
              checked={isChecked.SonarQube && data["SonarQube"]}
              className="newApp__checkbox"
              onClick={() => selectCard("SonarQube")}
            />
            <img src={"/img/tools/sonar.png"} />
            <span className="newApp__service-title">SonarQube</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
} 

SAST.propTypes = {
  tools: PropTypes.array
};

export default SAST;