import {BASE_URL} from '../config';

export const assetsApi = {
  fetchAllAssets: ({pageParam = 1}) =>
    fetch(`${BASE_URL}/v2/assets?page=${pageParam}`).then(async res => {
      const results = await res.json();
      return {results, nextPage: pageParam + 1};
    }),
  fetchAsset: id =>
    fetch(`${BASE_URL}/v1/assets/${id}/metrics`).then(res => {
      return res.json();
    }),
};
