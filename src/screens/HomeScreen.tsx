import * as React from 'react';
import { View, StyleSheet } from 'react-nativescript';
import { Button } from 'react-native-elements';
import { useAuth } from '@clerk/clerk-expo';

export default function HomeScreen({ navigation }) {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="News Feed"
        onPress={() => navigation.navigate('NewsFeed')}
      />
      <Button
        title="Calendar"
        onPress={() => navigation.navigate('Calendar')}
      />
      <Button
        title="Overtime"
        onPress={() => navigation.navigate('Overtime')}
      />
      <Button
        title="Sign Out"
        onPress={() => signOut()}
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