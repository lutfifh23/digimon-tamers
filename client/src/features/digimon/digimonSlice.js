import { createSlice } from '@reduxjs/toolkit'
import serverApi from '../../helper/serverApi'

export const digimonSlice = createSlice({
    name: 'digimons',
    initialState: {
        loading: false,
        digimons: []
    },
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload
        },
        setDigimons: (state, { payload }) => {
            state.digimons = payload
        }
    }
})

export const { setLoading, setDigimons } = digimonSlice.actions

export default digimonSlice.reducer

export const fetchDigimons = () => {
    return async function (dispatch) {
        dispatch(setLoading(true))
        const { data } = await serverApi.get('/digimons')
        dispatch(setDigimons(data))
        dispatch(setLoading(false))
    }
}