var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// index.tsx
var expo_firebase_recaptcha_patch_exports = {};
__export(expo_firebase_recaptcha_patch_exports, {
  useFirebaseLogin: () => useFirebaseLogin
});
module.exports = __toCommonJS(expo_firebase_recaptcha_patch_exports);
var import_auth = require("firebase/auth");
var import_react = __toESM(require("react"));

// src/firebase-recaptcha/banner.tsx
var import_react_native = require("react-native");
function FirebaseRecaptchaBanner(props) {
  const { textStyle, linkStyle, ...otherProps } = props;
  return <import_react_native.View {...otherProps}><import_react_native.Text style={[styles.text, textStyle]}>
    {"This app is protected by reCAPTCHA and the Google"}
    <import_react_native.Text
      style={[styles.link, linkStyle]}
      onPress={() => import_react_native.Linking.openURL("https://policies.google.com/privacy")}
    >{"\xA0Privacy Policy\xA0"}</import_react_native.Text>
    {"and"}
    <import_react_native.Text
      style={[styles.link, linkStyle]}
      onPress={() => import_react_native.Linking.openURL("https://policies.google.com/terms")}
    >{"\xA0Terms of Service\xA0"}</import_react_native.Text>
    {"apply."}
  </import_react_native.Text></import_react_native.View>;
}
var styles = import_react_native.StyleSheet.create({
  content: {
    ...import_react_native.StyleSheet.absoluteFillObject
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
var React2 = __toESM(require("react"));
var import_react_native2 = require("react-native");

// src/firebase-recaptcha/index.tsx
var React = __toESM(require("react"));
var import_react_native_webview = require("react-native-webview");
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
  return <import_react_native_webview.WebView
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
    return <import_react_native2.View style={styles2.container}>
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
      <import_react_native2.Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={this.cancel}
        onDismiss={this.onDismiss}
      ><import_react_native2.SafeAreaView style={styles2.modalContainer}>
        <import_react_native2.View style={styles2.header}>
          <import_react_native2.Text style={styles2.title}>{title}</import_react_native2.Text>
          <import_react_native2.View style={styles2.cancel}><import_react_native2.Button
            title={cancelLabel || _FirebaseRecaptchaVerifierModal.defaultProps.cancelLabel}
            onPress={this.cancel}
          /></import_react_native2.View>
        </import_react_native2.View>
        <import_react_native2.View style={styles2.content}>
          <FirebaseRecaptcha
            {...otherProps}
            style={styles2.content}
            onLoad={this.onVisibleLoad}
            onError={this.onError}
            onVerify={this.onVerify}
          />
          {!visibleLoaded ? <import_react_native2.View style={styles2.loader}><import_react_native2.ActivityIndicator size="large" /></import_react_native2.View> : void 0}
        </import_react_native2.View>
      </import_react_native2.SafeAreaView></import_react_native2.Modal>
    </import_react_native2.View>;
  }
};
var FirebaseRecaptchaVerifierModal = _FirebaseRecaptchaVerifierModal;
__publicField(FirebaseRecaptchaVerifierModal, "defaultProps", {
  title: "reCAPTCHA",
  cancelLabel: "Cancel"
});
var styles2 = import_react_native2.StyleSheet.create({
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
    borderBottomWidth: import_react_native2.StyleSheet.hairlineWidth
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
    ...import_react_native2.StyleSheet.absoluteFillObject,
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
  const recaptchaVerifier = import_react.default.useRef(null);
  const sendOtp = async (phoneNumber) => {
    if (!phoneNumber || !recaptchaVerifier.current)
      return;
    const phoneProvider = new import_auth.PhoneAuthProvider(auth);
    return phoneProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier.current
    );
  };
  const verifyOtp = async (verificationId, otp) => {
    if (!verificationId || !otp)
      return;
    const credential = import_auth.PhoneAuthProvider.credential(verificationId, otp);
    return (0, import_auth.signInWithCredential)(auth, credential);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useFirebaseLogin
});
