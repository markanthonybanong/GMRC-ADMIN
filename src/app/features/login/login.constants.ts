export enum UserType {
  SuperAdmin = 'Super Admin',
  Admin      = 'Admin'
}

export enum UserAction {
  LogInSuperAdmin,
  LogInAdmin,
  CreateAdminPassword,
  Next
}
