import "./App.css";
import stadium from "./stadium.png";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { places } from "./places";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  hasMetaMask,
  connectToMetaMask,
  getConnectedAccount,
} from "./Metamask";
import { num_max_tickets, nftAddresses } from "./constants";

function NFTButton(place, setSelectedTicket, setShowModal) {
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
      onPointerDown={() => {
        setSelectedTicket(place);
        setShowModal(true);
      }}
    ></button>
  );
}

async function handleConnectToMetaMask(accountStatus, setAccountStatus) {
  let successful = await connectToMetaMask(accountStatus, setAccountStatus);
  if (successful) {
    setAccountStatus(2);
  }
}

function MetaMaskComponent(accountStatus, setAccountStatus) {
  return (
    <div
      style={{
        position: "absolute",
        right: "2vw",
        borderRadius: "20vw",
        paddingRight: "4vw",
        paddingLeft: "1.2vw",
        backgroundColor: "yellow",
      }}
    >
      <div style={{ color: "black", fontSize: "1.8vw" }}>
        {accountStatus === 0
          ? "Metamask Not Present"
          : accountStatus === 1
          ? "Connect to MetaMask"
          : "Welcome"}
      </div>
      <button
        className={`btn ${
          accountStatus === 0
            ? "btn-danger"
            : accountStatus === 1
            ? "btn-info"
            : "btn-success"
        }`}
        style={{
          position: "absolute",
          padding: "0",
          top: "17%",
          right: "6%",
          width: "2vw",
          borderRadius: "20vw",
          height: "2vw",
        }}
        onPointerDown={() =>
          handleConnectToMetaMask(accountStatus, setAccountStatus)
        }
      ></button>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [accountStatus, setAccountStatus] = useState(hasMetaMask() ? 1 : 0); // 0 - doesn't have metamask, 1 - has metamask, 2 - connected to metamask
  const [connectedAccount, setConnectedAccount] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    async function fetchAccount() {
      let account = await getConnectedAccount();
      if (account) {
        setConnectedAccount(account);
        setAccountStatus(2);
      }
    }
    if (accountStatus === 1) {
      fetchAccount();
    }
  }, [accountStatus]);

  function InfoModal() {
    const LabelStyle = {fontSize: "1.5vw", fontWeight: '500' }
    return (
      <Modal
        show={showModal}
        onHide={setShowModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="bg-warning" closeButton>
          <Modal.Title>Ticket Informations</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <div>
            <span style={LabelStyle}>Stadium seat: </span>
            {selectedTicket.id}
          </div>
          <div>
            <span style={LabelStyle}>Ticket id: </span>
            {selectedTicket.tokenId}
          </div>
          <div>
            <label style={{...LabelStyle, display: 'block'}}>Ticket contract address: </label>
            <textarea disabled style={{width: '22vw', minHeight: '6vh', maxHeight: '6vh', overflow: 'auto'}}>
              {nftAddresses[selectedTicket.tokenId - 2]}
            </textarea>
          </div>
          <div>
            <span style={LabelStyle}>price: </span>0.09 ETH
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-warning" style={{display: 'flex', flexFlow: 'column'}}>
          <Button variant="danger" className="ps-5 pe-5" onClick={() => setShowModal(false)}>
            Buy
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="App">
      <div className="App-header mb-2" style={{ position: "relative" }}>
        <div className="p-3">Stadium NFT tickets</div>
        {MetaMaskComponent(accountStatus, setAccountStatus)}
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
              {places
                .slice(0, num_max_tickets)
                .map((place) =>
                  NFTButton(place, setSelectedTicket, setShowModal)
                )}
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedTicket && InfoModal()}
    </div>
  );
}

export default App;
