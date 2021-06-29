import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import SelectPicker from 'react-native-form-select-picker'
export default function HomeScreen({ navigation }){
    const [name, setName] = useState()
    const options = ['easy', 'medium', 'hard', 'random'];
    const [selected, setSelected] = useState('');
    function PlayTheGame(){
        if(!selected || !name){
            navigation.replace('Game', {
                name: 'anonymous',
                difficulty: 'easy'
            })
        } else {
            navigation.replace('Game', {
                name: name,
                difficulty: selected
            })
        }
        
    }
    function handlerChange(e){
        console.log(e);
        setName(e)
    }
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Welcome To Sudoku Mini Game</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            onChangeText={handlerChange}
            ></TextInput>
            <SelectPicker
            style={styles.picker}
            placeholder="Set Difficulty"
			onValueChange={(value) => {
				setSelected(value);
			}}
			selected={selected}
			>
            {
                options.map((val, i) => (
                    <SelectPicker.Item label={val} value={val} key={i} />
                ))
            }
		</SelectPicker>
            <TouchableOpacity
            style={styles.btnPlay}
            onPress={PlayTheGame}
            ><Text style={styles.btnPlaytext}>Let's Play</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#133f76'
    },
    input:{
        borderWidth: 1,
        width: 200,
        height: 40,
        padding:7,
        fontSize: 18,
        margin: 13,
        borderRadius: 13
    },
    picker: {
        borderWidth: 1,
        marginBottom: 5,
        width: 200,
        height: 40,
        borderRadius: 13
    },
    btnPlaytext: {
        fontSize: 20,
        textAlign: 'center',
        padding: 2,
        color: "#f7f7f7",
        fontWeight: 'bold',
    },
    btnPlaytextDisable: {
        fontSize: 20,
        textAlign: 'center',
        padding: 2,
        color: "#133f76",
        fontWeight: 'bold',
    },
    btnPlayDisable: {
        backgroundColor: '#f7f7f7',
        width: 100,
        height: 30,
        borderRadius: 12,
        opacity: 0.9
    },
    btnPlay: {
        backgroundColor: '#133f76',
        width: 100,
        height: 30,
        borderRadius: 12,
    }
})