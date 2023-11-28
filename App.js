import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [showHelp, setShowHelp] = useState(false);

  const handleWorkoutsPress = () => {
    // Navigate to the Workouts screen
    console.log('Navigate to Workouts screen');
  };

  const handleBodyStatsPress = () => {
    // Navigate to the Body Stats screen
    console.log('Navigate to Body Stats screen');
  };

  const handleHelpPress = () => {
    // Show the Help page
    setShowHelp(true);
  };

  const handleCloseHelp = () => {
    // Close the Help page
    setShowHelp(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Strongman+</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleWorkoutsPress}>
          <Text style={styles.buttonText}>Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBodyStatsPress}>
          <Text style={styles.buttonText}>Body Stats</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.helpButton} onPress={handleHelpPress}>
        <Text style={styles.buttonText}>Help</Text>
      </TouchableOpacity>

      {showHelp && (
        <View style={styles.helpContainer}>
          <Text style={styles.title}>Help</Text>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseHelp}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  helpButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helpContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 10,
  },
});
