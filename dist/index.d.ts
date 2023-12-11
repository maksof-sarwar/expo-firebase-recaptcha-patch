import * as firebase_auth from 'firebase/auth';
import { Auth } from 'firebase/auth';
import { FirebaseOptions } from 'firebase/app';
import * as React from 'react';
import React__default, { ComponentProps } from 'react';
import { ViewProps, StyleProp, TextStyle } from 'react-native';
import { WebView } from 'react-native-webview';

interface Props$2 extends ViewProps {
    textStyle?: StyleProp<TextStyle>;
    linkStyle?: StyleProp<TextStyle>;
}
declare function FirebaseRecaptchaBanner(props: Props$2): React.JSX.Element;

interface FirebaseAuthApplicationVerifier {
    readonly type: string;
    verify(): Promise<string>;
}
interface Props$1 extends React.ComponentProps<typeof WebView> {
    firebaseConfig?: FirebaseOptions;
    firebaseVersion?: string;
    appVerificationDisabledForTesting?: boolean;
    languageCode?: string;
    onLoad?: () => any;
    onError?: () => any;
    onVerify: (token: string) => any;
    onFullChallenge?: () => any;
    invisible?: boolean;
    verify?: boolean;
}
declare function FirebaseRecaptcha(props: Props$1): React.JSX.Element;

interface Props extends Omit<React.ComponentProps<typeof FirebaseRecaptcha>, 'onVerify' | 'invisible' | 'verify' | 'onVerify' | 'onLoad' | 'onError' | 'onFullChallenge'> {
    title?: string;
    cancelLabel?: string;
    attemptInvisibleVerification?: boolean;
}
interface State {
    visible: boolean;
    visibleLoaded: boolean;
    invisibleLoaded: boolean;
    invisibleVerify: boolean;
    invisibleKey: number;
    resolve?: (token: string) => void;
    reject?: (error: Error) => void;
}
declare class FirebaseRecaptchaVerifierModal extends React.Component<Props, State> implements FirebaseAuthApplicationVerifier {
    static defaultProps: {
        title: string;
        cancelLabel: string;
    };
    state: State;
    static getDerivedStateFromProps(props: Props, state: State): {
        invisibleLoaded: boolean;
        invisibleVerify: boolean;
    };
    get type(): string;
    verify(): Promise<string>;
    _reset(...args: any): void;
    private onVisibleLoad;
    private onInvisibleLoad;
    private onFullChallenge;
    private onError;
    private onVerify;
    cancel: () => void;
    onDismiss: () => void;
    render(): React.JSX.Element;
}

interface UseFirebaseLogin {
    auth: Auth;
    firebaseConfig: FirebaseOptions;
    modalOption?: ComponentProps<typeof FirebaseRecaptchaVerifierModal>;
    bannerOption?: ComponentProps<typeof FirebaseRecaptchaBanner>;
}
declare const useFirebaseLogin: ({ auth, firebaseConfig, modalOption, bannerOption, }: UseFirebaseLogin) => {
    recaptcha: React__default.JSX.Element;
    recaptchaBanner: React__default.JSX.Element;
    sendOtp: (phoneNumber: string) => Promise<string>;
    verifyOtp: (verificationId: string, otp: string) => Promise<firebase_auth.UserCredential>;
};

export { useFirebaseLogin };
