import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Input } from '@rneui/themed';
import * as DocumentPicker from 'expo-document-picker';
import { supabase } from '../lib/supabase';

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching profile', error);
    } else {
      setProfile(data);
    }
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
      });

      if (result.type === 'success') {
        console.log('Document selected:', result.uri);
        // Implement the actual upload logic here
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text h4>Profile</Text>
      <Input
        label="Name"
        value={profile.name}
        disabled
      />
      <Input
        label="Email"
        value={profile.email}
        disabled
      />
      <Button
        title="Upload Document"
        onPress={handleUpload}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});