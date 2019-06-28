import React from 'react'
import { View, Text, Dimensions, Platform, TextInput } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { Audio } from 'expo-av'

import { Directions, backwardMove, BoardComponent, SnakeComponent, cookFood, FoodComponent } from '../snake-config'
import styles from '../styles'

class SnakeBoard extends React.Component<any> {
  state = {
    blocks: [],
    snake: [],
    borderCenter: 0,
    direction: Directions.RIGHT,
    foodCoord: { foodX: 0, foodY: 0 },
    score: 0,
    audio: new Audio.Sound(),
  }

  // text input reference
  textinput: TextInput = null

  async componentDidMount() {
    const blocks: JSX.Element[][] = this._generateBlocks(Dimensions.get('window'))
    let { blocks: newBlocks, snake, foodCoord } = this._createSnake(blocks)
    await this.state.audio.loadAsync(require('./../assets/eating-sound.mp3'))
    this.setState({ blocks: newBlocks, snake, foodCoord }, this._moveSnake)
  }

  // generate board blocks
  _generateBlocks = ({ height, width }) => {
    // get smaller of height and width
    let smallHeight = height < width ? height : width

    // round off to previous multiple of 10 (because we keep dimension of one block as 10 X 10)
    smallHeight = (smallHeight / 10) * 10

    // max number of blocks
    let numberOfBlocks = ~~(smallHeight / 10)
    let row = numberOfBlocks

    // increase board height if running on mobile device
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      row = numberOfBlocks + ~~(numberOfBlocks / 2)
    }

    let blocks = new Array(row - 10)

    // create 2d array
    for (let i = 0; i < row - 10; i++) {
      blocks[i] = new Array(numberOfBlocks - 5)
      for (let j = 0; j < numberOfBlocks - 5; j++) {
        blocks[i][j] = <BoardComponent id={`${i}${j}`} />
      }
    }

    return blocks
  }

  // create initial snake of size 3
  _createSnake = (blocks: JSX.Element[][]) => {
    // get center of board
    const x: number = ~~(blocks.length / 2)
    const y: number = ~~(blocks[0].length / 2)

    let snake = [{ x, y: y - 1 }, { x, y }, { x, y: y + 1 }]
    snake.forEach(coord => {
      blocks[coord.x][coord.y] = <SnakeComponent id={`${coord.x}${coord.y}`} />
    })

    // generate food at random location
    const { foodX, foodY } = cookFood(blocks.length, blocks[0].length)
    blocks[foodX][foodY] = <FoodComponent id={`${foodX}${foodY}`} />

    return { blocks, snake, foodCoord: { foodX, foodY } }
  }

  // keep moving snake
  _moveSnake = () => {
    const intervalID = setInterval(async () => {
      // keep listening to keypress on web
      if (Platform.OS === 'web' && this.textinput) this.textinput.focus()

      const { snake, blocks, direction, foodCoord, score, audio } = this.state

      // get first and last position of snake
      const first = snake[0]
      const last = snake[snake.length - 1]

      // new food coordinates if previous one is eaten
      let newFoodCoord = foodCoord
      let newScore = score

      // food eaten
      if (last.x === foodCoord.foodX && last.y === foodCoord.foodY) {
        audio.playAsync()
        blocks[last.x][last.y] = <SnakeComponent id={`${last.x}${last.y}`} />
        snake.unshift({ x: last.x, y: last.y })

        // cook new food
        newFoodCoord = cookFood(blocks.length, blocks[0].length)
        blocks[newFoodCoord.foodX][newFoodCoord.foodY] = (
          <FoodComponent id={`${newFoodCoord.foodX}${newFoodCoord.foodY}`} />
        )

        // update score
        newScore += 1
      }

      // snake touched the border
      if (
        (Directions.matches(direction) === 'UP' && last.x - 1 < 0) ||
        (Directions.matches(direction) === 'RIGHT' && last.y + 1 === blocks[0].length) ||
        (Directions.matches(direction) === 'DOWN' && last.x + 1 === blocks.length) ||
        (Directions.matches(direction) === 'LEFT' && last.y - 1 < 0)
      ) {
        clearInterval(intervalID)
        await audio.unloadAsync()
        await audio.loadAsync(require('./../assets/game-over-sound.mp3'))
        audio.playAsync()
        this.props.onGameOver()
        return
      }

      // remove first position of snake
      snake.shift()

      // modify blocks
      blocks[first.x][first.y] = <BoardComponent id={`${first.x}${first.y}`} />
      blocks[last.x + direction.x][last.y + direction.y] = (
        <SnakeComponent id={`${last.x + direction.x}${last.y + direction.y}`} />
      )

      snake.push({ x: last.x + direction.x, y: last.y + direction.y })
      this.setState({ snake, blocks, foodCoord: newFoodCoord, score: newScore })
    }, 100)
  }

  // detect gestures on device
  _onPanGestureEvent = ({ nativeEvent }) => {
    const { translationX, translationY } = nativeEvent

    if (Math.abs(translationX) < 20 && translationY > 0) return this._changeDirection('DOWN')
    if (translationX > 0 && Math.abs(translationY) < 20) return this._changeDirection('RIGHT')
    if (Math.abs(translationX) < 20 && translationY < 0) return this._changeDirection('UP')
    if (translationX < 0 && Math.abs(translationY) < 20) return this._changeDirection('LEFT')
  }

  // detect keypress on web
  _onKeyPress = ({ nativeEvent }) => {
    switch (nativeEvent.key) {
      case 'ArrowUp':
        return this._changeDirection('UP')
      case 'ArrowLeft':
        return this._changeDirection('LEFT')
      case 'ArrowDown':
        return this._changeDirection('DOWN')
      case 'ArrowRight':
        return this._changeDirection('RIGHT')
      default:
        return
    }
  }

  // change snake direction
  _changeDirection = (dir: string) => {
    if (backwardMove(this.state.direction, dir)) return

    let direction = {}
    switch (dir) {
      case 'UP':
        direction = Directions.UP
        break
      case 'RIGHT':
        direction = Directions.RIGHT
        break
      case 'DOWN':
        direction = Directions.DOWN
        break
      case 'LEFT':
        direction = Directions.LEFT
        break
      default:
        return
    }
    this.setState({ direction })
  }

  render() {
    return (
      <>
        <LinearGradient
          style={styles.scoreContainer}
          colors={['#b21f1f', '#fdbb2d']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.scoreHeading}>Current Score</Text>
          <Text style={styles.scoreText}>{this.state.score}</Text>
        </LinearGradient>

        <PanGestureHandler onGestureEvent={this._onPanGestureEvent}>
          <View style={styles.board}>
            {this.state.blocks.map(blockLine => {
              return <View style={{ flexDirection: 'row' }}>{blockLine.map((block: any) => block)}</View>
            })}
          </View>
        </PanGestureHandler>

        {/* Detect keypress event on web */}
        {Platform.OS === 'web' && (
          <TextInput
            ref={input => (this.textinput = input)}
            autoFocus
            onKeyPress={this._onKeyPress}
            style={{ height: 0, width: 0 }}
          />
        )}
      </>
    )
  }
}

export default SnakeBoard
