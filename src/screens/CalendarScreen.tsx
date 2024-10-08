import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, ListItem } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../lib/supabase';

export default function CalendarScreen() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*');

    if (error) {
      console.error('Error fetching events', error);
    } else {
      setEvents(data);
    }
  };

  const handleRSVP = async (eventId) => {
    // Handle RSVP logic
    console.log('RSVP functionality to be implemented for event:', eventId);
  };

  const filteredEvents = events.filter(event => 
    new Date(event.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <View style={styles.container}>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={(event, date) => setSelectedDate(date || selectedDate)}
      />
      {filteredEvents.map((event) => (
        <ListItem key={event.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{event.title}</ListItem.Title>
            <ListItem.Subtitle>{event.description}</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            title="RSVP"
            onPress={() => handleRSVP(event.id)}
          />
        </ListItem>
      ))}
      {filteredEvents.length === 0 && (
        <Text style={styles.noEvents}>No events for this date</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noEvents: {
    textAlign: 'center',
    marginTop: 20,
  },
});