import React, {useCallback, useState} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {useFocusEffect} from '@react-navigation/native';
import Asset from '../components/Asset';
import {assetsApi} from '../actions/assets';
import SecureStorageManager from '../util/secure_store_manager';

const Favorites = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  const getLocalData = useCallback(async () => {
    const items = await SecureStorageManager.getLocalFavorites();
    setFavorites(items);
    return items;
  }, []);

  useFocusEffect(
    useCallback(() => {
      getLocalData();
    }, [getLocalData]),
  );

  const {isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage} =
    useInfiniteQuery('assets', assetsApi.fetchAllAssets, {
      getNextPageParam: lastPage => {
        if (lastPage.next !== null) {
          return lastPage.next;
        }

        return lastPage;
      },
    });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const assetItemExtractorKey = (item, index) => {
    return index.toString();
  };

  const renderSpinner = () => {
    return <ActivityIndicator color="blue" size="small" />;
  };

  const renderData = item => {
    const favorite = favorites?.includes(item?.item?.slug);
    return favorite ? (
      <Asset
        name={item?.item?.name}
        price={item?.item?.metrics.market_data?.price_usd.toFixed(2)}
        favorite
        onPress={() =>
          navigation.navigate('Asset', {
            assetKey: item?.item?.id,
            favorite: false,
          })
        }
      />
    ) : null;
  };

  return isLoading ? (
    <ActivityIndicator size="large" color="blue" style={styles.loader} />
  ) : (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data?.pages.map(page => page?.results?.data).flat()}
          keyExtractor={assetItemExtractorKey}
          renderItem={renderData}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  loader: {flex: 1, justifyContent: 'center'},
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default Favorites;
