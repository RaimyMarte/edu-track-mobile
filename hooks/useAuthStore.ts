import { checkingCredentials, loginState, logoutState, } from "../store/auth"
import { UserInterface } from "@/interfaces/user/userInterface"
import { useAppDispatch, useAppSelector } from "./reduxHooks"

export const useAuthStore = () => {
    const { status, user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const handleCheckingCredentials = () => dispatch(checkingCredentials())
    const handleLoginState = (payload: UserInterface | null) => dispatch(loginState(payload))
    const handleLogoutState = () => dispatch(logoutState())

    return {
        //Properties
        status,
        user,

        //Methods
        handleCheckingCredentials,
        handleLoginState,
        handleLogoutState,
    }
}