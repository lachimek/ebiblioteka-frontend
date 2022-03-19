import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { AppThunk } from "store";
import { api } from "api";
import { AxiosError } from "axios";

interface ILoginProps {
    login: string;
    password: string;
}

export interface ILoginState {
    token: string;
    expires: number;
    loading: boolean;
    error: string | null;
    loggedIn: boolean;
    user: IUser | null;
}

interface IUser {
    id: string;
    login: string;
    firstName: string;
    lastName: string;
}

interface IUserTokenDecoded {
    user: IUser;
    iat: number;
    exp: number;
}

const initialState: ILoginState = {
    token: "",
    expires: 0,
    loading: false,
    error: null,
    loggedIn: false,
    user: null,
};

const loginSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },

        setUser: (state, { payload }: PayloadAction<string>) => {
            state.token = payload;
            const decoded: IUserTokenDecoded = jwt_decode(payload);
            state.user = decoded.user;
            state.expires = decoded.exp;
            state.loggedIn = true;
            state.error = null;
        },

        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },

        setToken: (state, { payload }: PayloadAction<string>) => {
            state.token = payload;
            const decoded: IUserTokenDecoded = jwt_decode(payload);
            state.expires = decoded.exp;
        },

        logout: (state) => {
            state.loggedIn = false;
            state.user = null;
        },
    },
});

export const loginUser = ({ login, password }: ILoginProps): AppThunk => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await api.post("/v1/auth/login", {
                login: login,
                password: password,
            });
            dispatch(setUser(response.data.token));
            dispatch(setLoading(false));
            console.log(response);
        } catch (err: Error | AxiosError | any) {
            console.clear();
            console.log(err.response.data);
            dispatch(setError(err.response.data.error));
            dispatch(setLoading(false));
        }
    };
};

export const refreshToken = (): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await api.post("/v1/auth/refreshToken", {});
            dispatch(setToken(response.data.token));
            //console.log(response);
        } catch (err: Error | AxiosError | any) {
            console.clear();
            console.log(err.response.data);
            dispatch(logout());
        }
    };
};

export const { setLoading, setUser, setError, setToken, logout } = loginSlice.actions;

export const loginSelector = (state: { loginStore: ILoginState }) => state.loginStore;

export default loginSlice.reducer;
