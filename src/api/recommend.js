import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'
  // const url = ''
  const data = Object.assign({}, commonParams, {
    tpl: 'v12',
    page: 'other',
    format: 'jsonp',
    outCharset: 'GB2312'
  })
  return jsonp(url, data, options)
}

export function getSongList () {
  const url = '/api/getSongList'
  const data = Object.assign({}, commonParams, {
    outCharset: 'utf-8',
    format: 'json',
    categoryId: 10000000,
    sortId: 5,
    ein: 29,
    sin: 0,
    rnd: Math.random()
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
