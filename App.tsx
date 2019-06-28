import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import SnakeBoard from './components/snakeboard'
import StartGame from './components/gameMessage'
import styles from './styles'

export default class App extends React.Component {
  state = {
    startGame: false,
    gameOver: false,
  }

  // start the game
  _startGame = () => this.setState({ startGame: true, gameOver: false })

  // show game over screen
  _gameOver = () => this.setState({ startGame: false, gameOver: true })

  render() {
    const { startGame, gameOver } = this.state

    return (
      <LinearGradient
        colors={['#ADA996', '#F2F2F2', '#DBDBDB', '#EAEAEA']}
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        {(!startGame && !gameOver && <StartGame onPress={this._startGame} />) || null}
        {(gameOver && <StartGame onPress={this._startGame} gameOver />) || null}
        {(startGame && <SnakeBoard onGameOver={this._gameOver} />) || null}
      </LinearGradient>
    )
  }
}
