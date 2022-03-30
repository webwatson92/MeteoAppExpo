import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}2×.png`

export default function Weather({ forecast }) {
  return (
    <View style={styles.container}>
            <Text>{forecast.hour}</Text>

            <Image source={{ uri: getIcon(forecast?.icon) }}
            style={styles.image} />

            <Text style={styles.temp}>{forecast.temp}°C</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  container :{
      backgroundColor :"white",
      height:150,
      width:75,
      paddingVertical:6,
      justifyContent:"center",
      alignItems:'center',
      marginRight: 10,
      borderRadius: 50
  }, 
  image:{
    height :  50,
    width : 50
  },
  temp: {
    fontSize :18,
    fontWeight: "bold"
  }
})