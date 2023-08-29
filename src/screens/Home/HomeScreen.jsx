import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image } from 'react-native'

import Button from "../../components/Button/Button"
import cat from "../../../assets/images/cat.png"
import styles from './HomeScreen.style'
import Title from '../../components/Title/Title'


const HomeScreen = () => {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Meowmery</Text> */}
      <Title text="Meowmery" />
      <Image style={styles.image} source={cat}></Image>

      <View style={styles.wrapper}>
        <Button
          text="Start"
          theme="default"
          handlePress={() => navigation.navigate("Levels")}
        />
        <Button
          text="How To Play"
          theme="default"
          handlePress={() => navigation.navigate("Rules")}
        />
      </View>
    </View>
  )
}

export default HomeScreen