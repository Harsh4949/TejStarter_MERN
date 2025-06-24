import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_J53IJwR3z2IXmufvkLWLsNpUtcY7-3E",
  authDomain: "tejstarter-afd20.firebaseapp.com",
  projectId: "tejstarter-afd20",
  storageBucket: "tejstarter-afd20.firebasestorage.app",
  messagingSenderId: "879237123522",
  appId: "1:879237123522:web:2a6ff1c2a7f7e6c1b99a5b",
  measurementId: "G-58ESH0LEPZ"
};

class FireAuth {
  app;
  auth;
  recaptchaWidgetId;
  confirmationResult;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    console.log(firebaseConfig);
    
    this.auth = getAuth(this.app);
    this.auth.languageCode = 'en'; // You can use .useDeviceLanguage() too
  }

  generateRecaptcha(containerId = 'recaptcha-container') {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        this.auth,
        containerId,
        {
          size: 'normal', // Or 'invisible'
          callback: (response) => {
            console.log("reCAPTCHA solved ✅");
          },
          'expired-callback': () => {
            console.warn("reCAPTCHA expired");
          }
        }
      );

      window.recaptchaVerifier.render().then((widgetId) => {
        this.recaptchaWidgetId = widgetId;
        console.log("reCAPTCHA widget rendered:", widgetId);
      });
    }
  }

  async sendOtp(phoneNumber) {
    try {
      const appVerifier = window.recaptchaVerifier;
      this.confirmationResult = await signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);
      console.log("OTP sent to:", phoneNumber);
      return { message: "OTP sent", confirmationResult: this.confirmationResult };
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (this.recaptchaWidgetId) {
        grecaptcha.reset(this.recaptchaWidgetId);
      }
      throw error;
    }
  }

  async verifyOtp(code) {
    try {
      const result = await this.confirmationResult.confirm(code);
      console.log("User verified ✅", result.user);
      return result.user;
    } catch (error) {
      console.error("Invalid OTP ❌", error);
      throw error;
    }
  }
}

const fireAuth = new FireAuth();
export default fireAuth;