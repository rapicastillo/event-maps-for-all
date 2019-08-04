import { LOAD_LANGUAGE } from '../actions/actionTypes';

const defaultState = {
    activeLanguage: 'en',
    i18nSet: [],
    loading: false,
    error: false,
    data: [
        {
            lang: 'en',
            key: 'value_en' 
        },
        {
            lang: 'fr',
            key: 'value_fr'
        }
    ]
}

export default function (state=defaultState, action) {

    switch(action.type) {

        case LOAD_LANGUAGE:
            return { 
                ...state, 
                loading: true
            }
        default: return state;
    }
};