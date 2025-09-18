import http from './index';

/**
 * 用户列表接口
 * @param params 查询参数
 * @returns 用户列表数据
 */
export const getUserList = (params: { [key: string]: any }) => {
  return http.service.post('/api/board/widget/getData', params);
};

/**
 * 用户详情接口
 * @param id 用户ID
 * @returns 用户详情数据
 */
export const getUserDetail = (id: string | number) => {
  return http.service.get(`/user/${id}`);
};

/**
 * 添加用户接口
 * @param data 用户信息
 * @returns 操作结果
 */
export const addUser = (data: { [key: string]: any }) => {
  return http.service.post('/user/add', data);
};

/**
 * 更新用户接口
 * @param id 用户ID
 * @param data 用户信息
 * @returns 操作结果
 */
export const updateUser = (id: string | number, data: { [key: string]: any }) => {
  return http.service.put(`/user/${id}`, data);
};

/**
 * 删除用户接口
 * @param id 用户ID
 * @returns 操作结果
 */
export const deleteUser = (id: string | number) => {
  return http.service.delete(`/user/${id}`);
};

// 导出所有用户相关API
export default {
  getUserList,
  getUserDetail,
  addUser,
  updateUser,
  deleteUser
};