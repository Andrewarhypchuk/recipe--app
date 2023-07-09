import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/redux-store';

export const useAppDispatch: () => AppDispatch = useDispatch;

