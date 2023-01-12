/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-20 13:35:21
 * @LastEditors: kdsec
 * @LastEditTime: 2023-01-12 12:19:41
 */
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  username: state => state.user.username,
  roles: state => state.user.roles,
  // sidebar: state => state.app.sidebar,
  // size: state => state.app.size,
  // device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,
  permission_routes: state => state.permission.routes,
  // errorLogs: state => state.errorLog.logs

  menuData: state => state.setting.menuData

}
export default getters
