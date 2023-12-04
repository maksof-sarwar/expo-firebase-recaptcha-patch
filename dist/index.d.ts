import * as firebase_auth from 'firebase/auth';
import { Auth } from 'firebase/auth';
import { FirebaseOptions } from 'firebase/app';
import * as React from 'react';
import React__default, { ComponentProps } from 'react';
import { ViewProps, StyleProp, TextStyle } from 'react-native';

interface Props extends ViewProps {
    textStyle?: StyleProp<TextStyle>;
    linkStyle?: StyleProp<TextStyle>;
}
declare function FirebaseRecaptchaBanner(props: Props): React.JSX.Element;

interface UseFirebaseLogin {
    auth: Auth;
    firebaseConfig: FirebaseOptions;
    modalOption?: ComponentProps<typeof FirebaseRecaptchaBanner>;
    bannerOption?: ComponentProps<typeof FirebaseRecaptchaBanner>;
}
declare const useFirebaseLogin: ({ auth, firebaseConfig, modalOption, bannerOption, }: UseFirebaseLogin) => {
    recaptcha: React__default.JSX.Element;
    recaptchaBanner: React__default.JSX.Element;
    sendOtp: (phoneNumber: string) => Promise<string>;
    verifyOtp: (verificationId: string, otp: string) => Promise<firebase_auth.UserCredential>;
};

export { useFirebaseLogin };
