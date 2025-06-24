import React, { Component } from 'react';
import fireAuth from '../firebase/fireConfig'; // Use the default export, not named
import Header from '../components/Header/Header';
import { Container } from '../components/index';
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

        <Container>

        <h1>
          Hii
        </h1>
        
        </Container>

    );
  }
}

export default ResisterStud;
