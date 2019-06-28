import React from 'react'
import { View } from 'react-native'

import styles from '../styles'

/**
 * Define coordinates for directions
 */
export class Directions {
  // Directions
  static UP = { x: -1, y: 0 }
  static RIGHT = { x: 0, y: 1 }
  static DOWN = { x: 1, y: 0 }
  static LEFT = { x: -0, y: -1 }

  /**
   * @param currDir Object with x and y coordinates representing current direction
   * @returns String format of current direction
   */
  static matches = (currDir: { x: number; y: number }) => {
    if (currDir.x === Directions.UP.x && currDir.y === Directions.UP.y) return 'UP'
    if (currDir.x === Directions.DOWN.x && currDir.y === Directions.DOWN.y) return 'DOWN'
    if (currDir.x === Directions.RIGHT.x && currDir.y === Directions.RIGHT.y) return 'RIGHT'
    if (currDir.x === Directions.LEFT.x && currDir.y === Directions.LEFT.y) return 'LEFT'
  }
}

/**
 * Don't let the snake move backwards
 * @param currDir {x: number, y: number} Coordinates for current direction
 * @param nextDir String representing next direction
 * @returns True if backward move is triggered, otherwise False
 */
export const backwardMove = (currDir: { x: number; y: number }, nextDir: string) => {
  if (nextDir === 'UP' && (currDir.x === Directions.DOWN.x && currDir.y === Directions.DOWN.y)) return true
  if (nextDir === 'DOWN' && (currDir.x === Directions.UP.x && currDir.y === Directions.UP.y)) return true
  if (nextDir === 'RIGHT' && (currDir.x === Directions.LEFT.x && currDir.y === Directions.LEFT.y)) return true
  if (nextDir === 'LEFT' && (currDir.x === Directions.RIGHT.x && currDir.y === Directions.RIGHT.y)) return true

  return false
}

/**
 * Component representing single board block
 */
export const BoardComponent = ({ id }) => {
  return <View key={id} style={styles.boardComponent} />
}

/**
 * Component representing snake block
 */
export const SnakeComponent = ({ id }) => {
  return <View key={id} style={styles.snakeComponent} />
}

/**
 * Component representing food block
 */
export const FoodComponent = ({ id }) => {
  return <View key={id} style={styles.foodComponent} />
}

/**
 * Generate random food within snake board limit
 * @param rows Number of rows of snake board
 * @param cols Number of columns of snake board
 * @returns X and Y coordinates for food
 */
export const cookFood = (rows: number, cols: number) => {
  const foodX = ~~(Math.random() * rows)
  const foodY = ~~(Math.random() * cols)

  return { foodX, foodY }
}
