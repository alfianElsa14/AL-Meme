import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  users: 'users',
  memes: 'memes',
  comments: 'comments',
  likes: 'likes',
  myMemes: 'myMemes'
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

export const login = (data) => callAPI(`${urls.users}/login`, 'post', {}, {}, data)

export const register = (data) => callAPI(`${urls.users}/register`, 'post', {}, {}, data)

export const userById = () => callAPI(`${urls.users}/detailUser`, 'get')

export const editUser = (data) => callAPI(`${urls.users}/editUser`, 'put', {}, {}, data)

export const changePassword = (data) => callAPI(`${urls.users}/changePassword`, 'put', {}, {}, data)

export const getAllMeme = (page) => callAPI(`${urls.memes}?page=${page}`, 'get')

export const getMemeById = (id) => callAPI(`${urls.memes}/detailMeme/${id}`, 'get')

export const generateMeme = (id, data) => callAPI(`${urls.memes}/generateMeme/${id}`, 'post', {}, {}, data)

export const getAllComment = (id) => callAPI(`${urls.comments}/getComment/${id}`, 'get')

export const addComment = (id, data) => callAPI(`${urls.comments}/addComment/${id}`, 'post', {}, {}, data)

export const deleteComment = (id) => callAPI(`${urls.comments}/deleteComment/${id}`, 'delete')

export const addLike = (id) => callAPI(`${urls.likes}/addLike/${id}`, 'post')

export const getLike = (id) => callAPI(`${urls.likes}/getLike/${id}`, 'get')

export const removeLike = (id) => callAPI(`${urls.likes}/removeLike/${id}`, 'delete')

export const getMyMemes = () => callAPI(urls.myMemes, 'get')

export const addMyMeme = (id, data) => callAPI(`${urls.myMemes}/addMyMeme/${id}`, 'post', {}, {}, data)

export const deleteMyMeme = (id) => callAPI(`${urls.myMemes}/deleteMyMeme/${id}`, 'delete')

export const editMyMeme = (id, data) => callAPI(`${urls.myMemes}/editMyMeme/${id}`, 'put' , {}, {}, data)

export const getMyMemeById = (id) => callAPI(`${urls.myMemes}/${id}`, 'get')

export const midtransPayment = (id) => callAPI(`${urls.users}/midtransToken`, 'post')

export const updateStatusUser = () => callAPI(`${urls.users}/statusUser`, 'patch')

export const googleLogin = (data) => callAPI(`${urls.users}/googleLogin`, 'post', {}, {}, data)