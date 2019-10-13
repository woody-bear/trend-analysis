import React, {createContext, Dispatch, useContext, useReducer} from "react";

//상태 전용 Context
type LoadingState = boolean;
const LoadingStateContext = createContext<LoadingState | undefined>(undefined);

//Dispatch 전용 Context
type Action = { type : 'START' } | { type : 'FINISH'}

type LoadingDispatch = Dispatch<Action>;
const LoadingDispatchContext = createContext<LoadingDispatch | undefined>(undefined);

const LoadingReducer = (state: LoadingState, action : Action) : LoadingState => {
    switch (action.type) {
        case "START": return true;
        case "FINISH": return false;
        default : return state;
    }
};

export function LoadingContextProvider({ children }: { children: React.ReactNode }) {
    const [Loading, dispatch] = useReducer(LoadingReducer, false);

    return (
        <LoadingDispatchContext.Provider value={dispatch}>
            <LoadingStateContext.Provider value={Loading}>
                {children}
            </LoadingStateContext.Provider>
        </LoadingDispatchContext.Provider>
    );
}

export function useLoadingState() {
    const state = useContext(LoadingStateContext);
    if(state === undefined) throw new Error('InfoProvider not found');
    return state;
}

export function useLoadingDispatch() {
    const dispatch =  useContext(LoadingDispatchContext);
    if(dispatch === undefined) throw new Error('InfoProvider not found');
    return dispatch;
}
