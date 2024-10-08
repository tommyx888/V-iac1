import * as React from 'react';
import { View, StyleSheet } from 'react-nativescript';
import { Button, Input } from 'react-native-elements';
import { useSignUp } from '@clerk/clerk-expo';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signUp, isLoading } = useSignUp();

  const handleSignUp = async () => {
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });
      // Handle successful sign up
    } catch (err) {
      console.error('Error signing up', err);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign Up"
        onPress={handleSignUp}
        loading={isLoading}
      />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate('Login')}
        type="outline"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});