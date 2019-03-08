import * as fromUI from './ui.actions';

export interface State {
    isLoading: boolean;
    //si mas adelante necesito otras cosas simplemente las agrego aca siempre conviene manejar como un objeto
}

const initState: State = {
    isLoading: false
};

export function uiReducer(state = initState, action: fromUI.acciones): State {
    switch (action.type) {
        case fromUI.ACTIVAR_LOADING:
            return {
                //si hubieran mas campos se tendria que usar ...
                isLoading: true
            };

        case fromUI.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };

        default:
            return state;
    }
}
