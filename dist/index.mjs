var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// index.tsx
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import React3 from "react";

// src/firebase-recaptcha/banner.tsx
import {
  Linking,
  StyleSheet,
  Text,
  View
} from "react-native";
function FirebaseRecaptchaBanner(props) {
  const { textStyle, linkStyle, ...otherProps } = props;
  return <View {...otherProps}><Text style={[styles.text, textStyle]}>
    {"This app is protected by reCAPTCHA and the Google"}
    <Text
      style={[styles.link, linkStyle]}
      onPress={() => Linking.openURL("https://policies.google.com/privacy")}
    >{"\xA0Privacy Policy\xA0"}</Text>
    {"and"}
    <Text
      style={[styles.link, linkStyle]}
      onPress={() => Linking.openURL("https://policies.google.com/terms")}
    >{"\xA0Terms of Service\xA0"}</Text>
    {"apply."}
  </Text></View>;
}
var styles = StyleSheet.create({
  content: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    fontSize: 13,
    opacity: 0.5
  },
  link: {
    color: "blue"
  }
});

// src/firebase-recaptcha/modal.tsx
import * as React2 from "react";
import {
  ActivityIndicator,
  Button,
  Modal,
  SafeAreaView,
  StyleSheet as StyleSheet2,
  Text as Text2,
  View as View2
} from "react-native";

// src/firebase-recaptcha/index.tsx
import * as React from "react";
import { WebView } from "react-native-webview";
function getWebviewSource(firebaseConfig, firebaseVersion, appVerificationDisabledForTesting = false, languageCode, invisible) {
  firebaseVersion = firebaseVersion || "8.0.0";
  return {
    baseUrl: `https://${firebaseConfig.authDomain}`,
    html: `
<!DOCTYPE html><html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="HandheldFriendly" content="true">
  <script src="https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-app.js"><\/script>
  <script src="https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-auth.js"><\/script>
  <script type="text/javascript">firebase.initializeApp(${JSON.stringify(
      firebaseConfig
    )});<\/script>
  <style>
    html, body {
      height: 100%;
      ${invisible ? `padding: 0; margin: 0;` : ``}
    }
    #recaptcha-btn {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      border: 0;
      user-select: none;
      -webkit-user-select: none;
    }
  </style>
</head>
<body>
  ${invisible ? `<button id="recaptcha-btn" type="button" onclick="onClickButton()">Confirm reCAPTCHA</button>` : `<div id="recaptcha-cont" class="g-recaptcha"></div>`}
  <script>
    var fullChallengeTimer;
    function onVerify(token) {
      if (fullChallengeTimer) {
        clearInterval(fullChallengeTimer);
        fullChallengeTimer = undefined;
      }
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'verify',
        token: token
      }));
    }
    function onLoad() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'load'
      }));
      firebase.auth().settings.appVerificationDisabledForTesting = ${appVerificationDisabledForTesting};
      ${languageCode ? `firebase.auth().languageCode = '${languageCode}';` : ""}
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("${invisible ? "recaptcha-btn" : "recaptcha-cont"}", {
        size: "${invisible ? "invisible" : "normal"}",
        callback: onVerify
      });
      window.recaptchaVerifier.render();
    }
    function onError() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'error'
      }));
    }
    function onClickButton() {
      if (!fullChallengeTimer) {
        fullChallengeTimer = setInterval(function() {
          var iframes = document.getElementsByTagName("iframe");
          var isFullChallenge = false;
          for (i = 0; i < iframes.length; i++) {
            var parentWindow = iframes[i].parentNode ? iframes[i].parentNode.parentNode : undefined;
            var isHidden = parentWindow && parentWindow.style.opacity == 0;
            isFullChallenge = isFullChallenge || (
              !isHidden && 
              ((iframes[i].title === 'recaptcha challenge') ||
               (iframes[i].src.indexOf('google.com/recaptcha/api2/bframe') >= 0)));
          }
          if (isFullChallenge) {
            clearInterval(fullChallengeTimer);
            fullChallengeTimer = undefined;
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'fullChallenge'
            }));  
          }
        }, 100);
      }
    }
    window.addEventListener('message', function(event) {
      if (event.data.verify) {
        document.getElementById('recaptcha-btn').click();
      }
    });
  <\/script>
  <script src="https://www.google.com/recaptcha/api.js?onload=onLoad&render=explicit&hl=${languageCode ?? ""}" onerror="onError()"><\/script>
</body></html>`
  };
}
function validateFirebaseConfig(firebaseConfig) {
  if (!firebaseConfig) {
    const err = new Error("Missing firebase web configuration.");
    err["code"] = "ERR_FIREBASE_RECAPTCHA_CONFIG";
    throw err;
  }
  const { authDomain } = firebaseConfig;
  if (!authDomain) {
    const err = new Error(
      'Missing "authDomain" in firebase web configuration.'
    );
    err["code"] = "ERR_FIREBASE_RECAPTCHA_CONFIG";
  }
}
function FirebaseRecaptcha(props) {
  const {
    firebaseConfig,
    firebaseVersion,
    appVerificationDisabledForTesting,
    languageCode,
    onVerify,
    onLoad,
    onError,
    onFullChallenge,
    invisible,
    verify,
    ...otherProps
  } = props;
  const webview = React.useRef(null);
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (webview.current && loaded && verify) {
      webview.current.injectJavaScript(`
    (function(){
      window.dispatchEvent(new MessageEvent('message', {data: { verify: true }}));
    })();
    true;
    `);
    }
    return () => {
    };
  }, [webview, verify, loaded]);
  validateFirebaseConfig(firebaseConfig);
  if (!firebaseConfig) {
    console.error(
      `FirebaseRecaptcha: Missing firebase web configuration. Please set the "expo.web.config.firebase" field in "app.json" or use the "firebaseConfig" prop.`
    );
    return null;
  }
  return <WebView
    ref={webview}
    javaScriptEnabled
    automaticallyAdjustContentInsets
    scalesPageToFit
    mixedContentMode="always"
    source={getWebviewSource(
      firebaseConfig,
      firebaseVersion,
      appVerificationDisabledForTesting,
      languageCode,
      invisible
    )}
    onError={onError}
    onMessage={(event) => {
      const data = JSON.parse(event.nativeEvent.data);
      switch (data.type) {
        case "load":
          if (onLoad) {
            setLoaded(true);
            onLoad();
          }
          break;
        case "error":
          if (onError) {
            onError();
          }
          break;
        case "verify":
          onVerify(data.token);
          break;
        case "fullChallenge":
          if (onFullChallenge) {
            onFullChallenge();
          }
          break;
      }
    }}
    {...otherProps}
  />;
}

// src/firebase-recaptcha/modal.tsx
var _FirebaseRecaptchaVerifierModal = class extends React2.Component {
  state = {
    visible: false,
    visibleLoaded: false,
    invisibleLoaded: false,
    invisibleVerify: false,
    invisibleKey: 1,
    resolve: void 0,
    reject: void 0
  };
  static getDerivedStateFromProps(props, state) {
    if (!props.attemptInvisibleVerification && state.invisibleLoaded) {
      return {
        invisibleLoaded: false,
        invisibleVerify: false
      };
    }
    return null;
  }
  get type() {
    return "recaptcha";
  }
  async verify() {
    return new Promise((resolve, reject) => {
      if (this.props.attemptInvisibleVerification) {
        this.setState({
          invisibleVerify: true,
          resolve,
          reject
        });
      } else {
        this.setState({
          visible: true,
          visibleLoaded: false,
          resolve,
          reject
        });
      }
    });
  }
  _reset(...args) {
  }
  onVisibleLoad = () => {
    this.setState({
      visibleLoaded: true
    });
  };
  onInvisibleLoad = () => {
    this.setState({
      invisibleLoaded: true
    });
  };
  onFullChallenge = async () => {
    this.setState({
      invisibleVerify: false,
      visible: true
    });
  };
  onError = () => {
    const { reject } = this.state;
    if (reject) {
      const err = new Error("Failed to load reCAPTCHA");
      err["code"] = "ERR_FIREBASE_RECAPTCHA_ERROR";
      reject(err);
    }
    this.setState({
      visible: false,
      invisibleVerify: false
    });
  };
  onVerify = (token) => {
    const { resolve } = this.state;
    if (resolve) {
      resolve(token);
    }
    this.setState((state) => ({
      visible: false,
      invisibleVerify: false,
      invisibleLoaded: false,
      invisibleKey: state.invisibleKey + 1
    }));
  };
  cancel = () => {
    const { reject } = this.state;
    if (reject) {
      const err = new Error("Cancelled by user");
      err["code"] = "ERR_FIREBASE_RECAPTCHA_CANCEL";
      reject(err);
    }
    this.setState({
      visible: false
    });
  };
  onDismiss = () => {
    if (this.state.visible) {
      this.cancel();
    }
  };
  render() {
    const { title, cancelLabel, attemptInvisibleVerification, ...otherProps } = this.props;
    const {
      visible,
      visibleLoaded,
      invisibleLoaded,
      invisibleVerify,
      invisibleKey
    } = this.state;
    return <View2 style={styles2.container}>
      {attemptInvisibleVerification && <FirebaseRecaptcha
        {...otherProps}
        key={`invisible${invisibleKey}`}
        style={styles2.invisible}
        onLoad={this.onInvisibleLoad}
        onError={this.onError}
        onVerify={this.onVerify}
        onFullChallenge={this.onFullChallenge}
        invisible
        verify={invisibleLoaded && invisibleVerify}
      />}
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={this.cancel}
        onDismiss={this.onDismiss}
      ><SafeAreaView style={styles2.modalContainer}>
        <View2 style={styles2.header}>
          <Text2 style={styles2.title}>{title}</Text2>
          <View2 style={styles2.cancel}><Button
            title={cancelLabel || _FirebaseRecaptchaVerifierModal.defaultProps.cancelLabel}
            onPress={this.cancel}
          /></View2>
        </View2>
        <View2 style={styles2.content}>
          <FirebaseRecaptcha
            {...otherProps}
            style={styles2.content}
            onLoad={this.onVisibleLoad}
            onError={this.onError}
            onVerify={this.onVerify}
          />
          {!visibleLoaded ? <View2 style={styles2.loader}><ActivityIndicator size="large" /></View2> : void 0}
        </View2>
      </SafeAreaView></Modal>
    </View2>;
  }
};
var FirebaseRecaptchaVerifierModal = _FirebaseRecaptchaVerifierModal;
__publicField(FirebaseRecaptchaVerifierModal, "defaultProps", {
  title: "reCAPTCHA",
  cancelLabel: "Cancel"
});
var styles2 = StyleSheet2.create({
  container: {
    width: 0,
    height: 0
  },
  invisible: {
    width: 300,
    height: 300
  },
  modalContainer: {
    flex: 1
  },
  header: {
    backgroundColor: "#FBFBFB",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#CECECE",
    borderBottomWidth: StyleSheet2.hairlineWidth
  },
  cancel: {
    position: "absolute",
    left: 8,
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold"
  },
  content: {
    flex: 1
  },
  loader: {
    ...StyleSheet2.absoluteFillObject,
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

// index.tsx
var useFirebaseLogin = ({
  auth,
  firebaseConfig,
  modalOption,
  bannerOption
}) => {
  const recaptchaVerifier = React3.useRef(null);
  const sendOtp = async (phoneNumber) => {
    if (!phoneNumber || !recaptchaVerifier.current)
      return;
    const phoneProvider = new PhoneAuthProvider(auth);
    return phoneProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier.current
    );
  };
  const verifyOtp = async (verificationId, otp) => {
    if (!verificationId || !otp)
      return;
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    return signInWithCredential(auth, credential);
  };
  return {
    recaptcha: <FirebaseRecaptchaVerifierModal
      ref={recaptchaVerifier}
      firebaseConfig={firebaseConfig}
      {...modalOption}
    />,
    recaptchaBanner: <FirebaseRecaptchaBanner {...bannerOption} />,
    sendOtp,
    verifyOtp
  };
};
export {
  useFirebaseLogin
};
