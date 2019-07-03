import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'react-native'

const Todo = ({ onClick, completed, text }) => (
  <Text
    onPress={onClick}
    style={{
      color: completed ? '#111111' :
          '#777777'
    }}
  >
    {text}
  </Text>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo
