import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const Asset = ({name, price, favorite, onPress}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View>
        <Text style={styles.black}>{name}</Text>
        <Text style={styles.black}>${price}</Text>
      </View>
      <Icon
        name={favorite ? 'md-star' : 'md-star-outline'}
        size={20}
        color="blue"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  black: {color: '#000'},
});

export default Asset;
