"use client";

import React, { useState, useRef } from 'react';
import Moveable from 'react-moveable';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {addSquareAction, resetSquaresAction, updateSquareAction} from "@/lib/mainSlice";
import {Simulate} from "react-dom/test-utils";

const SquareEditor: React.FC = () => {
    const squares = useAppSelector(state => state.main.squares)
    const dispatch = useAppDispatch()
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>('#0000ff');
    const squareRefs = useRef<Array<HTMLDivElement | null>>([]);
    const editorRef = useRef<HTMLDivElement | null>(null);

    const addSquare = () => {
        const newSquare = {
            color: selectedColor,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            rotate: 0
        };

        dispatch(addSquareAction(newSquare))
    };

    const reset = () => {
        setActiveIndex(null)
        dispatch(resetSquaresAction())
        localStorage.removeItem('squares');
    }

    const activateSquare = (index: number) => {
        setActiveIndex(index);
    };

    const updateSquare = (index: number, data: any) => {
        dispatch(updateSquareAction({index, square: data}))
    };

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        if (activeIndex !== null) {
            updateSquare(activeIndex, { color });
        }
    };

    const handleMoveableDrag = ({ target, clientX, clientY }: any) => {
        const rect = target.getBoundingClientRect();
        const editorRect = editorRef.current!.getBoundingClientRect();

        const left = Math.min(Math.max(clientX - rect.width / 2, 0), editorRect.width - rect.width);
        const top = Math.min(Math.max(clientY - rect.height / 2, 0), editorRect.height - rect.height);

        target.style.left = `${left}px`;
        target.style.top = `${top}px`;

        updateSquare(activeIndex!, {x: left, y: top})
    };

    const handleMoveableResize = ({ target, width, height }: any) => {
        const editorRect = editorRef.current!.getBoundingClientRect();

        const maxWidth = editorRect.width - target.offsetLeft;
        const maxHeight = editorRect.height - target.offsetTop;

        const newWidth = Math.min(width, maxWidth);
        const newHeight = Math.min(height, maxHeight);

        target.style.width = `${newWidth}px`;
        target.style.height = `${newHeight}px`;

        updateSquare(activeIndex!, {width: newWidth, height: newHeight})
    };

    return (
        <div className='flex flex-col items-center gap-3'>
            <div>
                <label className={'flex items-center'}>
                    Color:
                    <input
                        className={'ml-1'}
                        type="color"
                        value={selectedColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                    />
                </label>
            </div>

            <button className={'button'} onClick={reset}>Reset</button>

            <div
                ref={(ref) => (editorRef.current = ref)}
                style={{ position: 'relative', width: '500px', height: '500px', border: '1px solid #ccc' }}
            >
                {squares.map((square, index) => (
                    <div
                        key={index}
                        ref={(ref) => (squareRefs.current[index] = ref)}
                        onClick={() => activateSquare(index)}
                        style={{
                            width: `${square.width}px`,
                            height: `${square.height}px`,
                            background: square.color,
                            position: 'absolute',
                            left: square.x,
                            top: square.y,
                            transform: `rotate(${square.rotate || 0}deg)`,
                        }}
                    />
                ))}
                {activeIndex !== null && (
                    <Moveable
                        target={squareRefs.current[activeIndex]}
                        draggable={true}
                        resizable={true}
                        rotatable={true}
                        onDrag={handleMoveableDrag}
                        onResize={handleMoveableResize}
                        onRotate={({ beforeRotate }: any) => {
                            updateSquare(activeIndex, { rotate: beforeRotate });
                        }}
                    />
                )}
            </div>

            <button className={'button'} onClick={addSquare}>Add Square</button>
        </div>
    );
};

export default SquareEditor;
