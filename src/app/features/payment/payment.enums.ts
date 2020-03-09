export enum PaymentStatus {
  PAID                = 'Paid',
  UNPAID              = 'Unpaid',
  BALANCE             = 'Balance',
  USEDONEMONTHADVANCE = 'Used one month advance',
  NONE                = 'None',
}

export enum KeyStatus {
  PAID     = 'Paid',
  RETURNED = 'Returned',
  NONE     = 'None'
}

export enum Interest {
  PLUSFIVEPERCENT    = '+5% interest',
  PLUSTENPERCENT     = '+10% interest',
  PLUSFIFTEENPERCENT = '+15% interest',
  PLUSTWENTYPERCENT  = '+20% interest',
}

export enum TenantType {
  DECKTENANT     = 'deckTenant',
  AWAYDECKTENANT = 'awayDeckTenant',
  ROOMTENANT     = 'roomTenant'
}