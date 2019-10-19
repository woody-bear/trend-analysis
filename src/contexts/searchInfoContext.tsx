import React, {createContext, Dispatch, useContext, useReducer} from "react";

//상태 전용 Context
export type Info = {
    keyword : string;
    period : number;
};

type InfoState = Info;
const InfoStateContext = createContext<InfoState | undefined>(undefined);


//Dispatch 전용 Context
type Action = { keyword : string; period: number; }

type InfoDispatch = Dispatch<Action>;
const InfoDispatchContext = createContext<InfoDispatch | undefined>(undefined);

const InfoReducer = (state: InfoState, action : Action) : InfoState => {
    const {keyword, period} = action;

    return {
        ...state,
        keyword,
        period,
    }
};

export function InfoContextProvider({ children }: { children: React.ReactNode }) {
    const [info, dispatch] = useReducer(InfoReducer, {keyword : '' , period : 0});

    return (
        <InfoDispatchContext.Provider value={dispatch}>
            <InfoStateContext.Provider value={info}>
                {children}
            </InfoStateContext.Provider>
        </InfoDispatchContext.Provider>
    );
}

export function useInfoState() {
    const state = useContext(InfoStateContext);
    if (!state) throw new Error('InfoProvider not found');
    return state;
}

export function useInfoDispatch() {
    const dispatch = useContext(InfoDispatchContext);
    if (!dispatch) throw new Error('InfoProvider not found');
    return dispatch;
}