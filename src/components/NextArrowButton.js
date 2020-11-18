import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import colors from '../styles/color';

export default class NextArrowButton extends Component {
  render() {
    const {disabled, handelPress} = this.props;
    // console.log()
    return (
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={handelPress}
          style={[styles.button]}
          disabled={disabled}>
          <Icon
            name="angle-right"
            color={colors.white}
            size={32}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

NextArrowButton.propTypes = {
  disabled: PropTypes.bool,
  handleNextButton: PropTypes.func,
};

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: colors.orange,
  },
  icon: {
    marginRight: -2,
    marginTop: -2,
  },
});
