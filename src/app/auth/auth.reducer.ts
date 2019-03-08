import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    //relacionado al estado de la autenticacion
    user: User;
}

const estadoInicial: AuthState = {
    user: null
};

export function authReducer(state = estadoInicial, action: fromAuth.acciones): AuthState {
    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: {
                    ...action.user //tomo cada una de las propieades del objeto user y creo un nuevo objeto de pares de valores
                }
            };
        default:
            return state;
    }
}
