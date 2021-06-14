export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType
}

type InitialStateType = typeof initialState
type ActionType = any

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {return {type: 'APP/SET-STATUS', status} as const}
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>