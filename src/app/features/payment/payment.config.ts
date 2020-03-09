export const PAYMENT_CONFIG = {
    filter: {
        type: {
            ALLENTRIES: 'allEntries',
            ENTRYBYOBJECTID: 'entryByObjectId',
            ADVANCESEARCHENTRY: 'advanceSearchEntry',
            ALLROOMPAYMENTS: 'allRoomPayments',
            ROOMPAYMENTBYOBJECTID: 'roomPaymentByObjectId',
            ADVANCESEARCHROOMPAYMENT: 'advanceSearchRoomPayment',
            ROOMPAYMENTSINFOURMONTHS: 'roomPaymentsInFourMonths',
            ROOMPAYMENTSBYDATE: 'roomPaymentsByDate',
            ALLPENALTIES: 'allPenalties',
            PENALTYBYOBJECTID: 'penaltyByObjectId',
            ADVANCESEARCHPENALTY: 'advanceSearchPenalty',
            ALLUNSETTLEBILLS: 'allUnsettleBills',
            UNSETTLEBILLBYOBJECTID: 'unsettleBillByObjectId',
            ADVANCESEARCHUNSETTLEBILL: 'advanceSearchUnsettleBill',
            ROOMNUMBER: 'roomNumber',
        }
    },
    request: {
        entryPayments: {
            name: 'entryPayments',
            path: 'payment/entry/page'
        },
        roomPayments: {
            name: 'roomPayments',
            path: 'payment/roomPayment/page',
        },
        penaltyPayments: {
            name: 'penaltyPayments',
            path: 'payment/penalty/page' 
        },
        // TODO: update server with this path
        unsettleBillPayments: {
            name: 'unsettleBillPayments',
            path: 'payment/unsettle-bill/page'
        },
        addEntry: {
            name: 'submit',
            path: 'payment/createEntry'
        },
        updateEntry: {
            name: 'submit',
            path: 'payment/updateEntry/'
        },
        addRoomPayment: {
            name: 'submit',
            path: 'payment/createRoomPayment'
        },
        updateRoomPayment: {
            name: 'submit',
            path: 'payment/updateRoomPayment/'
        },
        room: {
            name: 'room',
            path: 'room/page'
        },
        addPenalty: {
            name: 'submit',
            path: 'payment/createPenalty'
        },
        updatePenalty: {
            name: 'submit',
            path: 'payment/updatePenalty'
        },
        deletePenalty: {
            name: 'submit',
            path: 'payment/removePenalty/'
        },
        deleteTenantInUnsettleBill: {
            name: 'submit',
            path: 'payment/removeTenantInUnsettleBill'
        },
        addUpdateUnsettleBill: {
            name: 'submit',
            path: 'payment/unsettle-bill'
        },
        deleteUnsettleBill: {
            name: 'submit',
            path: 'payment/removeUnsettleBill/'
        }
    },
    action: {
        addEntry: 'ADD ENTRY',
        updateEntry: 'UPDATE ENTRY',
        addRoomPayment: 'ADD ROOM PAYMENT',
        updateRoomPayment: 'UPDATE ROOM PAYMENT',
        addPenalty: 'ADD PENALTY',
        updatePenalty: 'UPDATE PENALTY',
        deletePenalty: 'DELETE PENALTY',
        addUnSettleBill: 'ADD UNSETTLE BILL',
        updateUnSettleBill: 'UPDATE UNSETTLE BILL',
        deleteUnSettleBill: 'DELETE UNSETTLE BILL',
        deleteTenant: 'DELETE TENANT'
    }
}
