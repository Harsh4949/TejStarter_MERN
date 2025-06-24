import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async sendOtpGmail({ email }) {
        try {
            const sessionToken = await this.account.createEmailToken(
                ID.unique(),
                email
            );

            const userId = sessionToken.userId;
            console.log("OTP sent to email. User ID:", userId);
            return { message: 'Email verification token sent.', userId };
        } catch (error) {
            console.log("Appwrite service :: sendOtpGmail :: error", error);
            throw error;
        }
    }

    async verifyGmail({ userId, secret }) {
        try {
            const session = await this.account.createSession(userId, secret);
            console.log("Session created:", session);
            return { message: "Login successful", session };
        } catch (error) {
            console.log("Appwrite service :: verifyGmail :: error", error);
            throw error;
        }
    }

    async sendOtpSms({ phone }) {
        try {
            const token = await this.account.createPhoneToken(
                ID.unique(),
                phone // e.g., '+919876543210'
            );

            const userId = token.userId;
            console.log("OTP sent via SMS. User ID:", userId);

            return { message: 'SMS verification token sent.', userId };
            
        } catch (error) {
            console.log("Appwrite service :: sendOtpSms :: error", error);
            throw error;
        }
    }

    async verifyPhoneOtp({ userId, secret }) {
        try {
            const session = await this.account.createSession(userId, secret);
            console.log("Login successful:", session);
            return { message: 'Login successful', session };

        } catch (error) {
            console.log("Appwrite service :: verifyPhoneOtp :: error", error);
            throw error;
        }
    }


}

const authService = new AuthService();

export {authService};


