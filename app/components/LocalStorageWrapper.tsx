import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from "@/lib/store";
import {saveSquaresAction} from "@/lib/mainSlice";

type IProps = {
    children: React.ReactNode
}

const LocalStorageWrapper: React.FC<IProps> = ({ children }) => {
    const dispatch = useDispatch();
    const squares = useSelector((state: RootState) => state.main.squares);

    useEffect(() => {
        const storedValue = localStorage.getItem('squares');
        if (storedValue && JSON.parse(storedValue).length) {
            console.log({val: JSON.parse(storedValue)})
            dispatch(saveSquaresAction(JSON.parse(storedValue)));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('squares', JSON.stringify(squares));
    }, [squares]);

    return <>{children}</>;
};

export default LocalStorageWrapper;
