import React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
export default function SudoBoard({ name, difficulty, navigation }){
    const [mainBoard, setMainBoard] = useState([]) // origin board
    const [sudoBoard, setSudoBoard] = useState([]) // client see
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
            .then(res => res.json())
            .then(data => {
                let board = data.board
                setMainBoard(board)
                setSudoBoard(board)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    },[])

    function handleOnChange(input, i, j){
        const newData = JSON.parse(JSON.stringify(sudoBoard)) // deep copy
        newData[i][j] = Number(input)
        setSudoBoard(newData)
        console.log(difficulty, 'ini difficulty');
    }
    // quit
    function Quit(){
        navigation.replace('Home')
    }

    // validasi
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');


    function solvedByApi(){
        console.log(mainBoard, '<<< ni main board ');
        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            body: encodeParams({ board: mainBoard }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => response.json())
        .then(data => {
            let solution = data.solution
            console.log(solution, ' ini solve nya');
            setSudoBoard(solution)
        })
        .catch(err => console.log(err))
    }

    function validateAnswer(payload){
        fetch('https://sugoku.herokuapp.com/validate', {
            method: 'POST',
            body: encodeParams({ board: payload}),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(res => res.json())
        .then(data => {
            let status = data.status
            if(status == 'solved'){
                navigation.replace('Finish', {
                    statusUser: 'solved',
                    name,
                    difficulty
                })
            }else{
                Alert.alert(
                    "Incorrect",
                    "OK to play again!!!",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        })
        .catch(err => console.log(err))
    }

    
    if(loading){
        return(
            <Text>Loading...</Text>
        )
    }else{
        return(
            <View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 30}}>{name.toUpperCase()} is playing</Text>
                </View>
                <View>
                    {
                        sudoBoard.map((element, i) => 
                        <View key={i+"i"} style={styles.boardSetting}>
                            {
                                element.map((num,j) => 
                                <View key={j+"j"}>
                                    <TextInput 
                                    keyboardType="number-pad" 
                                    maxLength={1}
                                    editable={mainBoard[i][j] !== 0 ? false:true}
                                    value={num === 0 ? '':num}
                                    onChangeText={userInput => handleOnChange(userInput, i, j)} 
                                    style={mainBoard[i][j] === 0 ? styles.numSettingChange: styles.numSetting}
                                    ></TextInput>
                                </View>)
                            }
                        </View>)
                    }
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly',
        alignItems: 'center', margin: 5}}>
                    <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        solvedByApi()
                    }}
                    ><Text style={styles.textBtn}>Hint</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        validateAnswer(sudoBoard)
                    }}
                    ><Text style={styles.textBtn}>Done</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.btn}
                    onPress={Quit}
                    ><Text style={styles.textBtn}>Quit</Text>
                    </TouchableOpacity>
                </View>
            </View>
                
        )
    }
}

const styles = StyleSheet.create({
    boardSetting: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2c2f33',
    },
    numSettingChange:{
        color: '#587ca2',
        textAlign: 'center',
        borderWidth: 0.9,
        borderColor: '#2c2f33',
        backgroundColor: '#fcecdb',
        fontSize: 23,
        width: 40,
        height: 40,
        padding: 5
    },
    numSetting: {
        color: '#fcecdb',
        textAlign: 'center',
        borderWidth: 0.9,
        borderColor: '#2c2f33',
        backgroundColor: '#587ca2',
        fontSize: 23,
        width: 40,
        height: 40,
        padding: 5
    },
    btn: {
        backgroundColor: '#587ca2',
        height: 30,
        width: 60,
        padding: 2
    },
    textBtn: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fcecdb',
        fontWeight: 700
    }
})