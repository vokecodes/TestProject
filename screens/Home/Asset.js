import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from 'react-query';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Chart from '../../components/Chart';
import {assetsApi} from '../../actions/assets';
import SecureStorageManager from '../../util/secure_store_manager';

const Asset = ({route}) => {
  const [favorites, setFavorites] = useState([]);

  const getLocalData = useCallback(async () => {
    const items = await SecureStorageManager.getLocalFavorites();
    setFavorites(items);
    return items;
  }, []);

  useEffect(() => {
    getLocalData();
  }, [getLocalData]);

  const getItemInLocalData = useCallback(
    async item => {
      const items = await getLocalData();
      if (!items.length) {
        return false;
      }
      return items.find(it => it === item);
    },
    [getLocalData],
  );

  const addRemoveFavorite = async slug => {
    const isItemExists = await getItemInLocalData(slug);
    const favorite = favorites;

    if (!isItemExists) {
      favorite.push(slug);
      setFavorites(favorite);
      saveToLocalStorage(favorite);
    } else {
      const others = favorite.filter(fav => fav !== slug);
      setFavorites(others);
      saveToLocalStorage(others);
    }
  };

  const saveToLocalStorage = useCallback(async data => {
    await SecureStorageManager.setLocalFavorites(data);
  }, []);

  const {assetKey} = route.params || {};

  const {isLoading, data} = useQuery(['asset', assetKey], () =>
    assetsApi.fetchAsset(assetKey),
  );

  const chartData = isLoading
    ? []
    : [
        data?.data?.market_data?.ohlcv_last_24_hour.open,
        data?.data?.market_data?.ohlcv_last_24_hour.low,
        data?.data?.market_data?.ohlcv_last_24_hour.high,
        data?.data?.market_data?.ohlcv_last_24_hour.close,
      ];

  return isLoading ? (
    <ActivityIndicator size="large" color="blue" style={styles.loader} />
  ) : (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.flexGrow}>
          <Text style={styles.title}>{data?.data?.name}</Text>
          <Text style={styles.black}>
            ${data?.data?.market_data?.price_usd.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity onPress={() => addRemoveFavorite(data?.data?.slug)}>
          <Icon
            name={
              favorites?.includes(data?.data?.slug) ? 'star' : 'star-outline'
            }
            size={24}
            color="blue"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.marginTop40}>
        <Chart chartData={chartData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  row: {flexDirection: 'row'},
  flexGrow: {flexGrow: 1},
  loader: {flex: 1, justifyContent: 'center'},
  title: {fontSize: 20, color: '#000'},
  marginTop40: {marginTop: 40},
  black: {color: '#000'},
});

export default Asset;
