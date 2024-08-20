import { configureStore } from '@reduxjs/toolkit'
import digimonReducer from './features/digimon/digimonSlice'

export default configureStore({
  reducer: {
    digimon: digimonReducer
  },
})