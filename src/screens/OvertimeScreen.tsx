import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-nativescript';
import { ListItem, Button, Text } from 'react-native-elements';
import { supabase } from '../lib/supabase';

export default function OvertimeScreen() {
  const [opportunities, setOpportunities] = React.useState([]);

  React.useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    const { data, error } = await supabase
      .from('overtime_opportunities')
      .select('*');

    if (error) {
      console.error('Error fetching overtime opportunities', error);
    } else {
      setOpportunities(data);
    }
  };

  const handleSignUp = async (opportunityId) => {
    // Handle sign up logic
  };

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
      </ListItem.Content>
      <Button
        title="Sign Up"
        onPress={() => handleSignUp(item.id)}
      />
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <Text h4>Overtime Opportunities</Text>
      <FlatList
        data={opportunities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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