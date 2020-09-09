import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

function RepositoryManagement(props) {

  const { data, setState } = useContext(NewAppContext);
  const { tools, isEKS } = props;
  const [isChecked, setCheckbox] = useState({
    ArtiFactory: tools.includes("ArtiFactory") ? true : false,
    Nexus: tools.includes("Nexus") ? true : false
  });

  useEffect(() => {
    setCheckbox({ 
      ArtiFactory: false,
      Nexus: false
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
        category: "Repository Management",
        service: serviceType,
      });
    }
  };

  return (
    <Card style={{ minWidth: "16rem" }}>
      <Card.Body className="text-center">
        <Card.Title>Repository Management</Card.Title>
        <div>
          <div className="newApp__service-logo newApp__service-logo--disabled">
            <input type="checkbox"
              inline
              disabled={tools.includes("ArtiFactory") ? true : false}
              checked={isChecked.ArtiFactory && data["FluxCD"]}
              className="newApp__checkbox"
            />
            <img src={require("./imgs/artifactory.png")} alt="artifactory" />
            <span className="newApp__service-title">ArtiFactory</span>
          </div>

          <div  className={`newApp__service-logo ${tools.includes("Nexus") ? "newApp__service-logo--alredy-installed" : !isEKS ? "newApp__service-logo--disabled" : ""}`}
            onClick={() => selectCard("Nexus")} >
            <input type="checkbox"
              inline
              disabled={tools.includes("Nexus") ? true : false}
              checked={isChecked.Nexus && data["Nexus"]}
              className="newApp__checkbox"
              onClick={() => selectCard("Nexus")}
            />
            <img src={require("./imgs/nexus.png")} alt="nexus"/>
            <span className="newApp__service-title">Nexus</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
} 

RepositoryManagement.propTypes = {
  tools: PropTypes.array,
  isEKS: PropTypes.bool,
};

export default RepositoryManagement;