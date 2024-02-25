import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFirebaseLogin } from './dist';
import { firebaseAuth, firebaseConfig } from './firebase';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native';
export default function App() {
	const [verificationCode , setVerificationCode] = useState()
	const [user , setUser] = useState()
	const [phone, setPhone] = useState();
	const { recaptcha, recaptchaBanner, sendOtp, verifyOtp } = useFirebaseLogin({
		auth: firebaseAuth,
		firebaseConfig,
		modalOption: { attemptInvisibleVerification: true },
	});
	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<Text>{JSON.stringify(user)}</Text>
			<StatusBar style="auto" />
			<View
				
			>
				<TextInput
					placeholder="useless placeholder"
					onChangeText={setPhone}
					value={phone}
					style={{ borderColor: '#fff' }}
				/>
				<Button
					title="send"
					onPress={async () => {
						try {
							if(verificationCode){
								const user = await verifyOtp(verificationCode, phone)
								setUser(user)
							}
							const code = await sendOtp(phone);
							setVerificationCode(code)
							setPhone('')
						} catch (error) {
							console.log(error.message);
						}
					}}
				/>
			</View>
			{recaptcha}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
