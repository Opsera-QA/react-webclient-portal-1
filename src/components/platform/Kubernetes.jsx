import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";


function Kubernetes(props) {

  const { data, setState } = useContext(NewAppContext);
  const { tools } = props;
  const [isChecked, setCheckbox] = useState({
    Anchore: tools.includes("Anchore") ? true : false,
    Argocd: tools.includes("Argocd") ? true : false,
    Spinnaker: tools.includes("Spinnaker") ? true : false,
    MongoDB: tools.includes("MongoDB") ? true : false,
    Kibana: tools.includes("Kibana") ? true : false,
    Sonatype: tools.includes("Sonatype") ? true : false,
    Prometheus: tools.includes("Prometheus") ? true : false,
    FluxCD: tools.includes("FluxCD") ? true : false,    
  });

  useEffect(() => {
    setCheckbox({ 
      Anchore: false,
      Argocd: false,
      Spinnaker: false,
      MongoDB: false,
      Kibana: false,
      Sonatype: false,
      Prometheus: false,
      FluxCD: false,       
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
        category: "Monitoring",
        service: serviceType,
      });
    }
  };


  return (
    <Card style={{ minWidth: "16rem" }}>
      <Card.Body className="text-center">
        <Card.Title>Kubernetes</Card.Title>
          
        <div>

          <div
            className={`newApp__service-logo ${tools.includes("Anchore") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("Anchore"),
                category: "Monitoring",
                service: "Anchore",
              })
            }
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("Anchore") ? true : false}
              checked={isChecked.Anchore}
              className="newApp__checkbox"
              onClick={() => selectCard("Anchore")}
            />
            <img src={require("./imgs/anchore.png")} />
            <span className="newApp__service-title">Anchore</span>
          </div>

          <div
            className={`newApp__service-logo ${tools.includes("Argocd") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("Argocd"),
                category: "Monitoring",
                service: "Argocd",
              })
            }
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("Argocd") ? true : false}
              checked={isChecked.Argocd}
              className="newApp__checkbox"
              onClick={() => selectCard("Argocd")}
            />
            <img src={require("./imgs/argocd.png")} />
            <span className="newApp__service-title">Argocd</span>
          </div>

          <div
            className={`newApp__service-logo ${tools.includes("Spinnaker") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("Spinnaker"),
                category: "Monitoring",
                service: "Spinnaker",
              })
            }            
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("Spinnaker") ? true : false}
              checked={isChecked.Spinnaker}
              className="newApp__checkbox"
              onClick={() => selectCard("Spinnaker")}
            />
            <img src={require("./imgs/spinnaker.png")} />
            <span className="newApp__service-title">Spinnaker</span>
          </div>
        </div>


          <div
            className={`newApp__service-logo ${tools.includes("MongoDB") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("MongoDB"),
                category: "Monitoring",
                service: "MongoDB",
              })
            }
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("MongoDB") ? true : false}
              checked={isChecked.MongoDB}
              className="newApp__checkbox"
              onClick={() => selectCard("MongoDB")}
            />
            <img src={require("./imgs/mongo.png")} />
            <span className="newApp__service-title">MongoDB</span>
          </div>

          <div
            className={`newApp__service-logo ${tools.includes("Kibana") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("Kibana"),
                category: "Monitoring",
                service: "Kibana",
              })
            }
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("Kibana") ? true : false}
              checked={isChecked.Kibana}
              className="newApp__checkbox"
              onClick={() => selectCard("Kibana")}
            />
            <img src={require("./imgs/kibana.png")} />
            <span className="newApp__service-title">Kibana</span>
          </div>

          <div
            className={`newApp__service-logo ${tools.includes("Sonatype") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("Sonatype"),
                category: "Monitoring",
                service: "Sonatype",
              })
            }
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("Sonatype") ? true : false}
              checked={isChecked.Anchore}
              className="newApp__checkbox"
              onClick={() => selectCard("Sonatype")}
            />
            <img src={require("./imgs/sonatype.png")} />
            <span className="newApp__service-title">Sonatype</span>
          </div>

          <div
            className={`newApp__service-logo ${tools.includes("Prometheus") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("Prometheus"),
                category: "Monitoring",
                service: "Prometheus",
              })
            }
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("Prometheus") ? true : false}
              checked={isChecked.Prometheus}
              className="newApp__checkbox"
              onClick={() => selectCard("Prometheus")}
            />
            <img src={require("./imgs/prometheus.png")} />
            <span className="newApp__service-title">Prometheus</span>
          </div>

          <div
            className={`newApp__service-logo ${tools.includes("FluxCD") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("FluxCD"),
                category: "Monitoring",
                service: "FluxCD",
              })
            }
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("FluxCD") ? true : false}
              checked={isChecked.FluxCD}
              className="newApp__checkbox"
              onClick={() => selectCard("FluxCD")}
            />
            <img src={require("./imgs/flux.png")} />
            <span className="newApp__service-title">FluxCD</span>
          </div>                                                

      </Card.Body>
    </Card>
  );
} 

Kubernetes.propTypes = {
  tools: PropTypes.array
};

export default Kubernetes;