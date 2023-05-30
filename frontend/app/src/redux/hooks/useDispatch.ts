import {useDispatch as useDispatchDefault} from 'react-redux';
import type {AppDispatch} from '../store';

export const useDispatch: () => AppDispatch = useDispatchDefault;
