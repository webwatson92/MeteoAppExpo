import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import * as Location from "expo-location"
import * as axios from "axios"
import CurrentWeather from "./components/CurrentWeather"
import Forecast from "./components/Forecast"

const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=87b78fdf651f51668ad8f35cedc5b228&lang=fr&units=metric`

export default function App() {
  //1 recurepation des coordonnées de l'utilisateur
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
      const getCoordinates = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync()
        if(status !== "granted"){
           return
        }
        const userLocation = await Location.getCurrentPositionAsync()
        getWeather(userLocation)

      }

      getCoordinates()
  }, [])

  //2- Réaliser une requête vers notre serveur
  const getWeather = async (location) => {
    try{
      const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))

      setData(response.data)
      setLoading(false)

    } catch(e){
      console.log('Erreur dans getWeather')
    }
  }
  //city
  //météo
  //prévisions


  if(loading){
    return <View style={styles.container}>
      <ActivityIndicator />
    </View>
  }

  return (
    <View style={styles.container}>
       <CurrentWeather data={data}/>
       <Forecast data={data}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#E2E6E1',
    padding: 8,
  }
});
