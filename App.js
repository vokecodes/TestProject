import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {QueryClient, QueryClientProvider} from 'react-query';
import HomeNavigator from './screens/Home/';
import Favorites from './screens/Favorites';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  item: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
});

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.row}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const style = StyleSheet.create({
          text: {
            color: isFocused ? 'blue' : 'black',
            marginTop: 5,
            marginBottom: 12,
            fontSize: 12,
          },
        });

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}>
            <Icon
              name={options.tabBarIcon}
              size={24}
              color={isFocused ? 'blue' : 'black'}
            />
            <Text style={style.text}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomeNavigator"
          tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen
            name="HomeNavigator"
            component={HomeNavigator}
            options={{tabBarIcon: 'home', title: 'Home'}}
          />
          <Tab.Screen
            name="Favorites"
            component={Favorites}
            options={{tabBarIcon: 'star'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
