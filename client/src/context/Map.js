import { useReducer, useContext, createContext } from "react";

export const MapContext = createContext();
export const useMap = () => useContext(MapContext);

const initialState = {
    url: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_URL":
            return { ...state, url: action.payload };
        default:
            throw new Error();
    }
}

export default function MapProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MapContext.Provider
            value={{
                url: state.url,
                setUrl: (value) => dispatch({ type: "SET_URL", payload: value }),
            }}
        >
            {children}
        </MapContext.Provider>
    );
}
