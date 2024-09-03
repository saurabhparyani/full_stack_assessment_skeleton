import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  selectedUsers: Record<number, boolean>
}

const initialState: UserState = {
  selectedUsers: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleUser: (state, action: PayloadAction<number>) => {
      const userId = action.payload
      state.selectedUsers[userId] = !state.selectedUsers[userId]
    },
    setSelectedUsers: (state, action: PayloadAction<number[]>) => {
      state.selectedUsers = {}
      action.payload.forEach(userId => {
        state.selectedUsers[userId] = true
      })
    },
    clearSelectedUsers: (state) => {
      state.selectedUsers = {}
    }
  }
})

export const { toggleUser, setSelectedUsers, clearSelectedUsers } = userSlice.actions

export default userSlice.reducer