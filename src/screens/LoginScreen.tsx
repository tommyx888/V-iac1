import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { useSignIn } from '@clerk/clerk-expo';

export default function LoginScreen({ navigation }) {
  const { signIn, isLoading } = useSignIn();

  const handleSignIn = async () => {
    try {
      const completeSignIn = await signIn.create({
        identifier: 'user@example.com',
        password: 'password',
      });
      await completeSignIn.completeSignIn();
      navigation.navigate('Profile');
    } catch (err) {
      console.error('Error signing in', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text h4>Login</Text>
      <Button
        title="Sign In"
        onPress={handleSignIn}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});