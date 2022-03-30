import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import { format } from 'date-fns'
//import { fr } from 'date-fns/loacle';
import Weather from "./Weather"

export default function Forecast({ data }) {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const forecastsData = data.list.map((f) => {
      const dt = new Date(f.dt * 1000);
      return {
        date: dt,
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        //name: format(dt, 'EEEE', { locale: fr }),
      };
    });

    //regrouper par jour les éléments
    
    setForecasts(forecastsData);
  }, [data]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      {forecasts.map(f => (
        <>
           <View>
              <Text>Le jour</Text>
              <Weather forecast={f}/>
           </View>
        </>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll:{
    height: "35%",
    weight : "100%"
  }
});
