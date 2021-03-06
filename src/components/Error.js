import React from "react";
import './Footer.scss';
import { Button } from "react-bootstrap";
import './Error.scss'

export default function Error() {
  return (
    <div id="error">
      <h1>Error</h1>
      <div id="login-welcome">
        <img id="brand" src="/vusic_icon.png" alt="vusic-icon"></img>
        <Button
          variant="login-button"
          href="http://localhost:4000/login"
        >
          View it!
        </Button>
      </div>
    </div>
  );
}
