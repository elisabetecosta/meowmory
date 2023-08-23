import React from "react"
import { View, Image } from "react-native"
import FlipCard from 'react-native-flip-card'


import cardBack from "../../../assets/images/card-back.png"
import styles from "./Card.style"

const Card = ({ card, disabled, flipped, matched, onCardPress }) => {

  const handleCardPress = () => {
    
    if (!disabled && !flipped) {
      onCardPress(card.id);
    }
    // if (!matched && !flipped) {

    // }
  }


  return (

    <FlipCard
      style={styles.card}
      clickable={!disabled && !flipped}
      flip={true}
      flipHorizontal={true}
      flipVertical={false}
      perspective={1000}
      friction={6}
      onFlipEnd={handleCardPress}
    >
      {/* Face Side */}
  
        <Image source={card.path} style={styles.cardImage} />
      
      {/* Back Side */}
      
        <Image source={cardBack} style={styles.cardImage} />
      
    </FlipCard>

  )
}

export default Card