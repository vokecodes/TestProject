import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const Asset = ({name, price, favorite, onPress}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View>
        <Text>{name}</Text>
        <Text>${price}</Text>
      </View>
      <Icon name={favorite ? 'star' : 'star-outline'} size={20} color="blue" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default Asset;
