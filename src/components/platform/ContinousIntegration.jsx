import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

function ContinousIntegration(props) {

  const { data, setState } = useContext(NewAppContext);
  const { tools } = props;
  const [isChecked, setCheckbox] = useState({
    Jenkins: tools.includes("Jenkins") ? true : false,
    Teamcity: tools.includes("Teamcity") ? true : false
  });

  useEffect(() => {
    setCheckbox({ 
      Jenkins: false,
      Teamcity: false
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
      delete data[serviceType];
    }else {
      //If it's a new selection, select the checkbox, show the modal and update the dataset (data from context here )
      setCheckbox({ 
        ...isChecked, 
        [serviceType] : true
      });
      setState({
        open: true,
        category: "Continuous Integration And Deployment",
        service: serviceType,
      });
    }
  };


  return (
    <>
      <Card style={{ minWidth: "16rem" }}>
        <Card.Body className="text-center">
          <Card.Title>Continuous Integration</Card.Title>
          <div>
            <div
              className={`newApp__service-logo ${tools.includes("Jenkins") ? "newApp__service-logo--alredy-installed" : ""}`}
              onClick={() => selectCard("Jenkins")}
            >
              <input type="checkbox"
                inline
                disabled={tools.includes("Jenkins") ? true : false}
                checked={isChecked.Jenkins}
                className="newApp__checkbox"
                onClick={() => selectCard("Jenkins")}
              />
              <img src={require("./imgs/jenkins.png")} alt="Jenkins" />
              <span className="newApp__service-title">Jenkins</span>
            </div>

            <div
              className="newApp__service-logo newApp__service-logo--disabled"
            >
              <input type="checkbox"
                inline
                disabled={tools.includes("Team City") ? true : false}
                checked={isChecked.Teamcity}
                className="newApp__checkbox"
              /> 
              <img src={require("./imgs/team-city.png")} alt="Team City"/>
              <span className="newApp__service-title">Team City</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
} 

ContinousIntegration.propTypes = {
  tools: PropTypes.array,
};

export default ContinousIntegration;
