import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

const StartGame = ({ onPress, gameOver = false }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.container}>
        <Text style={[styles.heading, { color: gameOver ? 'red' : 'black' }]}>
          {(gameOver && 'Game  Over') || 'Snake  Game!'}
        </Text>
        <Text style={[styles.subHeading, { color: gameOver ? 'green' : 'black' }]}>
          {(gameOver && 'Tap to Play again') || 'Tap to play'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 50,
    fontWeight: 'bold',
    margin: 20,
  },
  subHeading: {
    fontSize: 30,
    fontWeight: '500',
  },
})

export default StartGame
