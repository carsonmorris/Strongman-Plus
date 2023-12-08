import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  AsyncStorage,
} from 'react-native';

//  persistent data
var workouts = [];

// Workouts overlay component
const WorkoutsOverlay = ({ onClose }) => {
  const [newButtonName, setNewButtonName] = useState('');
  const [showAddButton, setShowAddButton] = useState(false);
  const [showNewOverlay, setShowNewOverlay] = useState(false);

  //  load previous workoutNames
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('workoutsAsync');
      if (value !== null) {
        // We have data!!
        console.log(value);
        workouts = value;
      }
    } catch (error) {
      console.log('Failed fetching workout titles.');
    }
  };
  const [buttons, setButtons] = useState(workouts); // Initial buttons

  const handleAddButton = () => {
    setShowAddButton(true);
  };

  const handleButtonTap = (buttonText) => {
    setNewButtonName(buttonText);
    setShowNewOverlay(true);
  };

  const handleSaveButton = () => {
    if (newButtonName.trim() !== '') {
      setButtons([...buttons, newButtonName]);
      workouts.push(newButtonName);

      _storeData = async () => {
        try {
          await AsyncStorage.setItem(workoutsAsync, workouts);
        } catch (error) {
          console.log('Failed saving workout titles.');
          console.log(JSON.stringify(workouts));
        }
      };

      setNewButtonName('');
      setShowAddButton(false);
    }
  };

  return (
    <View style={styles.overlayContainer}>
      <Text style={styles.title}>Workouts</Text>

      {buttons.map((button, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => handleButtonTap(button)}>
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

      {showNewOverlay && <NewOverlay onClose={() => setShowNewOverlay(false)} newButtonName={newButtonName} />}

    </View>
  );
};

var bodyTitles = [
  { id: 1, name: 'Date' },
  { id: 2, name: 'Weight' },
  { id: 3, name: 'SMM' },
  { id: 4, name: 'BFM' },
];
var bodyData = [
  { id: 1, data: ['', '', '', ''], colors: ['white'] }
];

// BodyStats overlay component
const BodyStatsOverlay = ({ onClose }) => {
  const [columns, setColumns] = useState(bodyTitles);
  const [rows, setRows] = useState(bodyData);
  const [newColumnName, setNewColumnName] = useState('');
  const [showAddButton, setShowAddButton] = useState(false);
  const [focusedCell, setFocusedCell] = useState(null);
  const [selectedColor, setSelectedColor] = useState('white');

  const colors = ['red', 'green', 'yellow'];

  const handleChangeColor = (color) => {
    setSelectedColor(color);
  };

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      data: columns.map(() => ''),
      colors: columns.map(() => 'white'),
    };
    bodyData.push(newRow);
    setRows([...rows, newRow]);
  };

  const handleCellTap = (rowIndex, cellIndex) => {
    setFocusedCell({ rowIndex, cellIndex });
  };

  return (
    <View style={styles.overlayContainer}>
      <TouchableOpacity style={styles.closeButtonTopRight} onPress={onClose}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Body Stats</Text>

      <ScrollView horizontal={true} style={styles.scrollView}>
        <View>
          {/* Table Header */}
          <View style={styles.tableRow}>
            {columns.map((column, columnIndex) => (
              <View key={column.id} style={styles.tableHeaderCell}>
                <TextInput
                  style={styles.columnHeaderInput}
                  value={column.name}
                  onChangeText={(text) => {
                    const updatedColumns = [...columns];
                    updatedColumns[columnIndex].name = text;
                    setColumns(updatedColumns);
                  }}
                  placeholder={`Column ${columnIndex + 1}`}
                />
              </View>
            ))}
          </View>

          {/* Table Body */}
          {rows.map((row, rowIndex) => (
            <View key={row.id} style={styles.tableRow}>
              {row.data.map((cell, cellIndex) => (
                <TouchableOpacity
                  key={cellIndex}
                  style={[
                    styles.tableCell,
                    { backgroundColor: row.colors[cellIndex] },
                  ]}
                  onPress={() => handleCellTap(rowIndex, cellIndex)}>
                  {focusedCell?.rowIndex === rowIndex &&
                    focusedCell?.cellIndex === cellIndex ? (
                    <TextInput
                      style={styles.tableInput}
                      value={cell}
                      onChangeText={(text) => {
                        const updatedRows = [...rows];
                        updatedRows[rowIndex].data[cellIndex] = text;
                        updatedRows[rowIndex].colors[cellIndex] = selectedColor; // Set the selected color
                        setRows(updatedRows);
                      }}
                      placeholder={`Enter value for ${columns[cellIndex].name}`}
                      autoFocus={true}
                    />
                  ) : (
                    <Text>{cell}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {/* Add Row Button */}
          <TouchableOpacity style={styles.addRowButton} onPress={addRow}>
            <Text style={styles.buttonText}>+ Add Row</Text>
          </TouchableOpacity>

          {/* Color Picker */}
          <View style={styles.colorPickerContainer}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorPickerButton,
                  { backgroundColor: color, borderColor: selectedColor === color ? 'black' : 'transparent' },
                ]}
                onPress={() => handleChangeColor(color)}>
                <Text style={styles.colorPickerButtonText}></Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

var workoutTitles = [
  { id: 1, name: 'Date' },
  { id: 2, name: 'Tap To Edit' },
];
var workoutData = [
  { id: 1, data: ['', ''], colors: ['white'] }
];

// New overlay component
const NewOverlay = ({ onClose, newButtonName }) => {
  const [columns, setColumns] = useState(workoutTitles);
  const [rows, setRows] = useState(workoutData);
  const [newColumnName, setNewColumnName] = useState('');
  const [showAddButton, setShowAddButton] = useState(false);
  const [focusedCell, setFocusedCell] = useState(null);
  const [selectedColor, setSelectedColor] = useState('white');

  const colors = ['red', 'green', 'yellow'];

  const handleChangeColor = (color) => {
    setSelectedColor(color);
  };

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      data: columns.map(() => ''),
      colors: columns.map(() => 'white'),
    };
    bodyData.push(newRow);
    setRows([...rows, newRow]);
  };

  const handleCellTap = (rowIndex, cellIndex) => {
    setFocusedCell({ rowIndex, cellIndex });
  };

  return (
    <View style={styles.overlayContainer}>
      <TouchableOpacity style={styles.closeButtonTopRight} onPress={onClose}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{newButtonName}</Text>

      <ScrollView horizontal={true} style={styles.scrollView}>
        <View>
          {/* Table Header */}
          <View style={styles.tableRow}>
            {columns.map((column, columnIndex) => (
              <View key={column.id} style={styles.tableHeaderCell}>
                <TextInput
                  style={styles.columnHeaderInput}
                  value={column.name}
                  onChangeText={(text) => {
                    const updatedColumns = [...columns];
                    updatedColumns[columnIndex].name = text;
                    setColumns(updatedColumns);
                  }}
                  placeholder={`Column ${columnIndex + 1}`}
                />
              </View>
            ))}
          </View>

          {/* Table Body */}
          {rows.map((row, rowIndex) => (
            <View key={row.id} style={styles.tableRow}>
              {row.data.map((cell, cellIndex) => (
                <TouchableOpacity
                  key={cellIndex}
                  style={[
                    styles.tableCell,
                    { backgroundColor: row.colors[cellIndex] },
                  ]}
                  onPress={() => handleCellTap(rowIndex, cellIndex)}>
                  {focusedCell?.rowIndex === rowIndex &&
                    focusedCell?.cellIndex === cellIndex ? (
                    <TextInput
                      style={styles.tableInput}
                      value={cell}
                      onChangeText={(text) => {
                        const updatedRows = [...rows];
                        updatedRows[rowIndex].data[cellIndex] = text;
                        updatedRows[rowIndex].colors[cellIndex] = selectedColor; // Set the selected color
                        setRows(updatedRows);
                      }}
                      placeholder={`Enter value for ${columns[cellIndex].name}`}
                      autoFocus={true}
                    />
                  ) : (
                    <Text>{cell}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {/* Add Row Button */}
          <TouchableOpacity style={styles.addRowButton} onPress={addRow}>
            <Text style={styles.buttonText}>+ Add Row</Text>
          </TouchableOpacity>

          {/* Color Picker */}
          <View style={styles.colorPickerContainer}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorPickerButton,
                  { backgroundColor: color, borderColor: selectedColor === color ? 'black' : 'transparent' },
                ]}
                onPress={() => handleChangeColor(color)}>
                <Text style={styles.colorPickerButtonText}></Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
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
          <Text>
            Thank you for choosing Strongman+ to be your fitness companion!
            Whether you're a seasoned gym-goer or just starting your fitness
            journey. Below, we'll guide you through the key features and
            functionalities of the app.
          </Text>

          <Text style={styles.sectionTitle}>Main Screen</Text>
          <Text>
            Upon launching Strongman+, you'll find two main buttons. Workouts:
            Navigate here to create and track your workout routines. Body Stats:
            Track your body stats and input valuable information about your
            fitness journey.
          </Text>

          <Text style={styles.sectionTitle}>Body Stats</Text>
          <Text>
            When you select "Body Stats," you can log various weights, the
            current date, and other relevant information. Tap on cells to change
            their color, indicating improvement or areas that need attention.
          </Text>

          <Text style={styles.sectionTitle}>Workouts</Text>
          <Text>
            The "Workouts" menu lets you track different types of exercises. You
            can create custom buttons for your workout categories, such as
            Back/Arms, Legs, Chest/Shoulders, etc. Each button links to a new,
            customizable spreadsheet for tracking your progress. Again, tap on
            cells to change their color, indicating improvement or areas that
            need attention.
          </Text>

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
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
  scrollView: {
    maxHeight: 600,
    flexGrow: 0,
  },

  tableRow: {
    flexDirection: 'row',
  },

  tableHeaderCell: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
    minWidth: 100, // Adjust the minWidth as needed
  },

  tableHeaderText: {
    fontWeight: 'bold',
    flex: 1,
  },

  tableCell: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minWidth: 100,
  },

  addRowButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  addColumnButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  tableInput: {
    flex: 1,
    height: 40,
  },
  closeButtonTopRight: {
    position: 'absolute',
    top: 35,
    right: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 10,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  colorPickerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPickerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
