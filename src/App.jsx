import "./App.css";
import stadium from "./stadium.png";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { places } from "./places";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function InfoModal(show, setShowModal) {
  return (
    <Modal show={show} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ticket Informations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Check here the ticket informations
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
}

function NFTButton(place, setShowModal) {
  let style = {
    width: "2vw",
    height: "2vw",
    padding: "0",
    borderRadius: "20vw",
    position: "absolute",
    ...place.position,
  };

  return (
    <button
      key={place.id}
      type="button"
      className="btn btn-primary"
      style={style}
      onPointerDown={() => {setShowModal(true)}}
    ></button>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <div className="App-header mb-2">
        <div className="p-3">Stadium NFT tickets</div>
      </div>
      <div style={{ position: "relative" }}>
        <div
          className="panel w-100"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="ImageContainer"
            style={{ position: "relative", width: "80%" }}
          >
            <img src={stadium} alt="stadium" className="w-100" />
            <div className="w-100">
              {places.map((place) => NFTButton(place, setShowModal))}
            </div>
          </div>
        </div>
      </div>

      {showModal && InfoModal(showModal, setShowModal)}
    </div>
  );
}

export default App;
