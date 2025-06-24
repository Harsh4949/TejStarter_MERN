import React, { Component } from 'react';
import fireAuth from '../firebase/fireConfig'; // Use the default export, not named

export class ResisterStud extends Component {

  sendOTPTOnumber = async () => {
    try {
        fireAuth.generateRecaptcha();
        await fireAuth.sendOtp('+918149744900');
      // Store confirmationResult in state if you want to use it later for OTP verification
    } catch (error) {
      console.log("Error sending OTP:", error);
    }
  }

  render() {
    return (
      <div>
        <div id="recaptcha-container"></div> {/* Important: this is required for Firebase */}
        <button onClick={this.sendOTPTOnumber}>Send OTP to Phone</button>
      </div>
    );
  }
}

export default ResisterStud;
