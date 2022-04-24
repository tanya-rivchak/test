import mutations from '@/store/mutations';

const { UPDATE_BANKS_LIST } = mutations;

const banksStore = {
    namespaced: true,
    state: {
        banksList: {
            'bank0': {
                name: 'Bank 1',
                rate: '10', loan: '100000',
                payment: '10', term: '12',
                editable: false
            },
            'bank1': {
                name: 'Bank 2',
                rate: '5', loan: '600000',
                payment: '17', term: '30',
                editable: false
            },
            'bank2': {
                name: 'Bank 3',
                rate: '3', loan: '300000',
                payment: '20', term: '24',
                editable: false
            }
        },
        fieldSet: [
            {
                name: 'name',
                placeholder: 'Bank name',
            },
            {
                name: 'rate',
                placeholder: 'Interest rate',
                unit: '%'
            },
            {
                name: 'loan',
                placeholder: 'Maximum loan',
                unit: '$'
            },
            {
                name: 'payment',
                placeholder: 'Minimum down payment',
                unit: '%'
            },
            {
                name: 'term',
                placeholder: 'Loan term',
                unit: 'months'
            }
        ]
    },
    getters: {
        banksList: ({ banksList }) => banksList,
        fieldSet: ({ fieldSet }) => {
            const newObj = {};

            fieldSet.forEach(field => {
                const { name, ...restField } = field;

                newObj[name] = restField;
            })

            return newObj
        },
        units: ({ fieldSet }) => {
            const unitsList = {};
            
            fieldSet.forEach(field => {
                if (!('unit' in field)) {
                    return
                }
                unitsList[field.name] = field.unit;
            })

            return unitsList
        },
        titles: ({ fieldSet }) => {
            const titlesList = {};
            
            fieldSet.forEach(field => {
                if (!('unit' in field)) {
                    return
                }
                titlesList[field.name] = field.placeholder;
            })

            return titlesList
        }
    },
    mutations: {
        [UPDATE_BANKS_LIST](state, newList) {
            state.banksList = newList
        }
    },
    actions: {
        setEditMode({ getters, commit }, value) {
            const { banksList } = getters;
            const newBanksList = { ...banksList };

            newBanksList[value].editable = !newBanksList[value].editable;

            commit(UPDATE_BANKS_LIST, newBanksList)
        },
        removeEditMode({ getters, commit }) {
            const { banksList } = getters;
            const newBanksList = { ...banksList };

            Object.keys(newBanksList).forEach(bank => {
                newBanksList[bank].editable = false;
            })

            commit(UPDATE_BANKS_LIST, newBanksList)
        },
        removeBank({ getters, commit }, id) {
            const { banksList } = getters;
            const newBanksList = { ...banksList };

            delete newBanksList[id];

            commit(UPDATE_BANKS_LIST, newBanksList)
        },
        updateBank({ getters, commit }, newBankObj) {
            const { banksList } = getters;
            const newBanksList = { ...banksList, ...newBankObj };

            commit(UPDATE_BANKS_LIST, newBanksList)
        },
        addNewBank({ getters, commit }, newBank) {
            const { banksList } = getters;
            const newBanksList = { ...banksList }

            newBank.editable = false;
            newBanksList[`bank${Date.now() + Math.random()}`] = newBank;
            
            commit(UPDATE_BANKS_LIST, newBanksList)
        },
    }
}
export default banksStore;