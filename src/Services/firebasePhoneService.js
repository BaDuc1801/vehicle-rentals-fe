import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";

export const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha-container',
            { size: 'invisible' },
        );
        console.log(window.recaptchaVerifier)
    }
};

export const firebasePhoneService = {
    sendOtp: async (phoneNumber) => {
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        window.confirmationResult = confirmationResult;
    },

    verifyOtp: async (code) => {
        const confirmationResult = window.confirmationResult;
        const result = await confirmationResult.confirm(code);
        const user = result.user;
        return user.phoneNumber;
    }
}