import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native';

// Workouts overlay component
const WorkoutsOverlay = ({ onClose }) => {
  const [newButtonName, setNewButtonName] = useState('');
  const [showAddButton, setShowAddButton] = useState(false);
  const [buttons, setButtons] = useState([]); // Initial buttons

  const handleAddButton = () => {
    setShowAddButton(true);
  };

  const handleSaveButton = () => {
    if (newButtonName.trim() !== '') {
      setButtons([...buttons, newButtonName]);
      setNewButtonName('');
      setShowAddButton(false);
    }
  };

  return (
    <View style={styles.overlayContainer}>
      <Text style={styles.title}>Workouts</Text>

      {buttons.map((button, index) => (
        <TouchableOpacity key={index} style={styles.button}>
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      ))}

      {showAddButton ? (
        <View style={styles.addContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Workout"
            onChangeText={(text) => setNewButtonName(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSaveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handleAddButton}>
          <Text style={styles.buttonText}>+ New Workout</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

// BodyStats overlay component
const BodyStatsOverlay = ({ onClose }) => {
  return (
    <View style={styles.overlayContainer}>
      <Text style={styles.title}>Body Stats</Text>
      {/* Add your Body Stats content here */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const [showHelp, setShowHelp] = useState(false);
  const [showWorkouts, setShowWorkouts] = useState(false);
  const [showBodyStats, setShowBodyStats] = useState(false);

  const handleWorkoutsPress = () => {
    setShowWorkouts(true);
  };

  const handleBodyStatsPress = () => {
    setShowBodyStats(true);
  };

  const handleHelpPress = () => {
    setShowHelp(true);
  };

  const handleClose = () => {
    setShowWorkouts(false);
    setShowBodyStats(false);
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

      {showWorkouts && <WorkoutsOverlay onClose={handleClose} />}
      {showBodyStats && <BodyStatsOverlay onClose={handleClose} />}

      {showHelp && (

        <View style={styles.overlayContainer}>
          <Text style={styles.title}>Welcome to Strongman+</Text>
          <Text style={styles.subtitle}>Getting Started</Text>
          <Text>Thank you for choosing Strongman+ to be your fitness companion! Whether you're a seasoned gym-goer or just starting your fitness journey. Below, we'll guide you through the key features and functionalities of the app.</Text>

          <Text style={styles.sectionTitle}>Main Screen</Text>
          <Text>Upon launching Strongman+, you'll find two main buttons. Workouts: Navigate here to create and track your workout routines. Body Stats: Track your body stats and input valuable information about your fitness journey.</Text>

          <Text style={styles.sectionTitle}>Body Stats</Text>
          <Text>When you select "Body Stats," you can log various weights, the current date, and other relevant information. Tap on cells to change their color, indicating improvement or areas that need attention.</Text>

          <Text style={styles.sectionTitle}>Workouts</Text>
          <Text>The "Workouts" menu lets you track different types of exercises. You can create custom buttons for your workout categories, such as Back/Arms, Legs, Chest/Shoulders, etc. Each button links to a new, customizable spreadsheet for tracking your progress. Again, tap on cells to change their color, indicating improvement or areas that need attention.</Text>

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>

      )}


    </View >
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
    fontSize: 48,
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
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
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
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    width: 150,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  finalText: {
    marginTop: 20,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});
