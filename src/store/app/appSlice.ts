import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store";
import {addDoc, collection} from "firebase/firestore";
import {db} from "@services/firebase.ts";
import {thunkErrorHelper} from "@utils/helperFunction/redux-helper.ts";
import {ProfileInfoPostCollection} from "@interface/index.ts";

interface appState {
    loading: boolean,
    error: string | null,
}



const initialState: appState = {
    loading: false,
    error: '',
}

export const createDocCollection = createAsyncThunk(
    'appSlice/createDocCollection',
    async (collectionRef: { data: ProfileInfoPostCollection, path: string }, {rejectWithValue}) => {
        try {
            return await addDoc(collection(db, collectionRef.path), collectionRef.data);
        }catch (error: unknown){
            return rejectWithValue(thunkErrorHelper(error) || 'Failed to create collection');
        }
    }
)

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createDocCollection.pending, (state) => {
            state.loading  = true;
            state.error = null;
        }).addCase(createDocCollection.rejected, (state, action) => {
            state.loading = false;
            state.error   = action.payload as string;
        }).addCase(createDocCollection.fulfilled, (state) => {
            state.loading = false;
            state.error = null
        })
    }
})

export const {setLoading} = appSlice.actions;
export const selectApp = (state: RootState) => state.appState;
export default appSlice.reducer;
