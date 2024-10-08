import * as React from 'react';
import { FlatList, View, StyleSheet } from 'react-nativescript';
import { ListItem } from 'react-native-elements';
import { supabase } from '../lib/supabase';

export default function NewsFeedScreen({ navigation }) {
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching news', error);
    } else {
      setNews(data);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => navigation.navigate('NewsDetail', { id: item.id })}
      bottomDivider
    >
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.summary}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});