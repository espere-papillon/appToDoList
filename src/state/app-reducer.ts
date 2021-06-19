export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState
type ActionType = SetAppStatusAT | SetAppErrorAT | SetIsInitializedAT

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {return {type: 'APP/SET-STATUS', status} as const}
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>

export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)
export type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>