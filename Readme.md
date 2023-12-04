## firebase phone number authentication react native expo hook

Run command for install `npm i -D @itzsunny/firebase-login`

#### Example 
``` 
const {recaptcha,recaptchaBanner,sendOtp,verifyOtp} = useFirebaseLogin({auth: /** auth instance from firebase */,firebaseConfig:/** firebase config */});

// for sending otp to phone number 
sendOtp('+92XXXXXXXX')
// verify otp
verifyOtp('verification Id','XXXXX')


recaptcha // firebase recpatch element

```