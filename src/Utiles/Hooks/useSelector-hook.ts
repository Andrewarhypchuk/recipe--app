import { TypedUseSelectorHook ,useSelector } from 'react-redux'
import { RootState } from '../../Redux/redux-store'


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector ;