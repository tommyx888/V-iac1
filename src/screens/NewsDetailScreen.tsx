import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-nativescript';
import { Text } from 'react-native-elements';
import { supabase } from '../lib/supabase';

export default function NewsDetailScreen({ route }) {
  const { id } = route.params;
  const [newsItem, setNewsItem] = React.useState(null);

  React.useEffect(() => {
    fetchNewsItem();
  }, []);

  const fetchNewsItem = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching news item', error);
    } else {
      setNewsItem(data);
    }
  };

  if (!newsItem) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text h3>{newsItem.title}</Text>
      <Text>{newsItem.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});