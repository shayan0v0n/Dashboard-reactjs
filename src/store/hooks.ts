import { useDispatch, TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { appDispatch, RootState } from "./store";


export const useAppDispatch = () => useDispatch<appDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector