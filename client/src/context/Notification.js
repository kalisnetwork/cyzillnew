import { useReducer, useContext, createContext } from "react";

export const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

const initialState = {
    toggleNotification: "notification-move",
    notificationMsg: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_TOGGLE_NOTIFICATION":
            return { ...state, toggleNotification: action.payload };
        case "SET_NOTIFICATION_MSG":
            return { ...state, notificationMsg: action.payload };
        default:
            throw new Error();
    }
}

export default function NotificationProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <NotificationContext.Provider
            value={{
                toggleNotification: state.toggleNotification,
                setToggleNotification: (value) =>
                    dispatch({ type: "SET_TOGGLE_NOTIFICATION", payload: value }),
                notificationMsg: state.notificationMsg,
                setNotificationMsg: (value) =>
                    dispatch({ type: "SET_NOTIFICATION_MSG", payload: value }),
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}
