import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import Logo from '../assets/img/ParkSoonerLogoSmall.png'

const Home = () => {
  return (
    <View style={styles.container}>
        <Image source={Logo} style={styles.img} />
        <Text style={{marginTop: 10}}> University of Oklahoma</Text>
        <Text style={[styles.title, {marginBottom: 30}]}> Parking Map App</Text>

        <View style={styles.card}>
            <Text>First card on the app!</Text>
        </View>

    </View>
   
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    img: {
        marginVertical: 20,
        width: 100,
        height: 100,
    },
    card: {
        backgroundColor: '#EEE',
        padding: 20,
        borderRadius: 10,
        boxShadow: '4px 4px rgba(0,0,0,0.1)'
    }
})