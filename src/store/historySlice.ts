import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk, ThunkAction, Action } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './index';

export type HistoryState = {
    history: HistoryObjectType[];
};

type HistoryObjectType = {
    id: string;
    amount: number;
    convertedAmount: number;
    fromCurrency: string;
    toCurrency: string;
    date: string;
    notifyAmount: number | string;
    notifyDirection: string;
    subscribed: boolean;
    intervalId: NodeJS.Timeout | null;
    userId: number;
};

export const fetchCurrencyPrice = createAsyncThunk(
    'history/fetchCurrencyPrice',
    async (index: number, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const historyItem = state.history.history[index];

            const response = await axios.get(
                'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
                {
                    headers: {
                        'x-rapidapi-host': 'currency-converter-by-api-ninjas.p.rapidapi.com',
                        'x-rapidapi-key': 'e9ec7b6b68msh56974fcca61250fp18281cjsn7dcd57724cfc',
                    },
                    params: {
                        have: historyItem.fromCurrency,
                        want: historyItem.toCurrency,
                        amount: historyItem.amount,
                    },
                }
            );

            const responseData = response.data;
            return { responseData, historyItem };
        } catch (error) {
            throw new Error(String(error));
        }
    }
);

const getInitialHistoryState = (): HistoryState => {
    if (typeof localStorage !== 'undefined') {
        const conversionHistory = localStorage.getItem('conversionHistory');
        return { history: conversionHistory === null ? [] : JSON.parse(conversionHistory) };
    } else {
        return { history: [] };
    }
};

const historySlice = createSlice({
    name: 'history',
    initialState: getInitialHistoryState(),
    reducers: {
        addToHistory: (state, action: PayloadAction<HistoryObjectType>) => {
            const existingIndex = state.history.findIndex((item) => item.id === action.payload.id);
            if (action.payload.userId !== -1){
                if (existingIndex !== -1) {
                    state.history[existingIndex] = action.payload;
                } else {
                    state.history.push(action.payload);
                }
            }else{
                return;
            }
            
            localStorage.setItem('conversionHistory', JSON.stringify(state.history));
        },
        clearHistory: (state, action) => {
            const updatedHistory = state.history.filter((el) => el.userId !== action.payload);
            state.history = updatedHistory;
            localStorage.setItem('conversionHistory', JSON.stringify(updatedHistory));
        },
        deleteNote: (state, action) => {
            console.log(action.payload)
            const updatedHistory = state.history.filter((el) => el.id !== action.payload);
            state.history = updatedHistory;
            localStorage.setItem('conversionHistory', JSON.stringify(updatedHistory));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrencyPrice.fulfilled, (state, action) => {
            const { responseData, historyItem } = action.payload;

            if (historyItem.notifyDirection === 'increase') {
                if (
                    responseData.new_amount >=
                    Number(historyItem.convertedAmount) + Number(historyItem.notifyAmount)
                ) {
                    alert(
                        `${new Date(Date.now())} - ${historyItem.toCurrency} выросла в цене на ${historyItem.notifyAmount} ${historyItem.fromCurrency} и теперь стоит ${responseData.new_amount} ${historyItem.fromCurrency}`
                    );
                }
            } else if (historyItem.notifyDirection === 'decrease') {
                if (
                    responseData.new_amount <=
                    Number(historyItem.convertedAmount) - Number(historyItem.notifyAmount)
                ) {
                    alert(
                        `${new Date(Date.now())} - ${historyItem.toCurrency} упала в цене на ${historyItem.notifyAmount} ${historyItem.fromCurrency} и теперь стоит ${responseData.new_amount} ${historyItem.fromCurrency}`
                    );
                }
            }
            const updatedHistory = state.history.map((item) =>
                item.id === historyItem.id ? { ...item, convertedAmount: responseData.new_amount } : item
            );
            state.history = updatedHistory;
            localStorage.setItem('conversionHistory', JSON.stringify(updatedHistory));
        });
    },
});

export const { addToHistory, clearHistory, deleteNote } = historySlice.actions;

export const subscribe = (index: number): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    const state = getState();
    const historyItem = state.history.history[index];

    if (historyItem.intervalId === null) {
        const intervalId = setInterval(() => dispatch(fetchCurrencyPrice(index)), 1800000);

        const updatedHistory = state.history.history.map((item, i) =>
            i === index ? { ...item, intervalId, subscribed: true } : item
        );
        dispatch(addToHistory(updatedHistory[index]));
        localStorage.setItem(`intervalId_${index}`, String(intervalId))
    }
};


export const unsubscribe = (index: number): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
    const state = getState();
    const historyItem = state.history.history[index];

    if (historyItem.intervalId !== null) {
        clearInterval(historyItem.intervalId);

        const updatedHistory = state.history.history.map((item, i) =>
            i === index ? { ...item, intervalId: null, subscribed: false } : item
        );
        dispatch(addToHistory(updatedHistory[index]));
        localStorage.removeItem(`intervalId_${index}`);
    }
};
export default historySlice.reducer;