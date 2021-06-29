import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
export default function FinishScreen({ route, navigation }){
    const { name, difficulty } = route.params
    function goToHome(){
        console.log('ni home', name);
        navigation.replace('Home')
    }
    return(
        <View style={styles.container}>
            <Text>halo {name}, you're so smart</Text>
            <TouchableOpacity
            // style={styles.btnPlay}
            onPress={goToHome}
            ><Text>Lets, Play again</Text>
            </TouchableOpacity>
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
})