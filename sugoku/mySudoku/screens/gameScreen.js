import SudoBoard from '../components/Board'
import React from 'react'
import { View, StyleSheet } from 'react-native';

export default function GameScreen({ route, navigation }){
    
    const { name, difficulty } = route.params
    return(
        <View style={styles.container}>
            <SudoBoard name={name} difficulty={difficulty} navigation={navigation}></SudoBoard>
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
    }
})