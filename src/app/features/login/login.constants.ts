export enum UserType {
  SuperAdmin = 'Super Admin',
  Admin      = 'Admin'
}
/**
 * TODO: dont change the order
 */
export enum UserAction {
  OnLogInSuperAdmin,
  OnLogInAdmin,
  OnCreateAdminPassword,
  OnNext
}
