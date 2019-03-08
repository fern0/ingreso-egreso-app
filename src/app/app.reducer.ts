//archivo global que tiene toda la definicion de los estados

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State; //por ahora solo tengo este estado
    auth: fromAuth.AuthState; //agrego un segundo de mi app
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer
};