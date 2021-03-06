import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunkAddMember } from "store";
import { api, API_ROUTES } from "api";
import { AxiosError } from "axios";
import IMember from "interfaces/IMember";
import IMembersFormData from "interfaces/IMembersFormData";

export interface IAddMemberState {
    member: IMember | null;
    memberId: string;
    groups: { value: string; label: string }[];
    loading: boolean;
    loadingDelete: boolean;
    error: string | null;
}

const initialState: IAddMemberState = {
    member: null,
    memberId: "",
    groups: [{ value: "init", label: "brak" }],
    loading: false,
    loadingDelete: false,
    error: null,
};

const addMemberSlice = createSlice({
    name: "addMember",
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },

        setGroups: (state, { payload }: PayloadAction<{ value: string; label: string }[]>) => {
            state.groups = [{ value: "init", label: "brak" }, ...payload];
        },

        setMember: (state, { payload }: PayloadAction<IMember>) => {
            state.member = payload;
            state.error = null;
        },

        setMemberId: (state, { payload }: PayloadAction<string>) => {
            state.memberId = payload;
            state.error = null;
        },

        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },

        resetState: (state) => initialState,
    },
});

export const fetchGroups = (): AppThunkAddMember => {
    return async (dispatch) => {
        try {
            const {
                data: { groups },
            } = await api.get(`${API_ROUTES.GET_GROUP_ALL}`);
            if (!groups) throw "Error when fetching groups";

            dispatch(
                setGroups(
                    groups.map((group: any) => {
                        return { value: group.id, label: group.name };
                    })
                )
            );
        } catch (err: Error | AxiosError | any) {
            console.clear();
            dispatch(setError("Error when fetching groups"));
        }
    };
};

export const fetchMemberById = (id: string): AppThunkAddMember => {
    return async (dispatch) => {
        try {
            const {
                data: { member },
            } = await api.get(`${API_ROUTES.GET_STUDENT_ONE}?id=${id}`);
            console.log(member);

            //if (!member) throw "Member not found";
            dispatch(setMember(member));
        } catch (err: Error | AxiosError | any) {
            console.log(err);
            dispatch(setError("Member not found"));
        }
    };
};

export const registerMember = (member: IMembersFormData): AppThunkAddMember => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const { data } = await api.post(`${API_ROUTES.REGISTER_USER}`, {
                id: member.idField,
                firstName: member.firstName,
                lastName: member.lastName,
                email: member.email,
                phone: member.phone,
                city: member.city,
                postalCode: member.postalCode,
                streetAddress: member.streetAddress,
                groupId: member.groupId,
            });
            dispatch(setMemberId(data.member.id));
            dispatch(setLoading(false));
            console.log(data);
        } catch (err: Error | AxiosError | any) {
            console.log(err);
            dispatch(setLoading(false));
            dispatch(setError("Member not added"));
        }
    };
};

export const { setLoading, setError, setMember, setMemberId, setGroups, resetState } = addMemberSlice.actions;

export const addMemberSelector = (state: { addMemberStore: IAddMemberState }) => state.addMemberStore;

export default addMemberSlice.reducer;
