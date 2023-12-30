"use client";

import React from 'react';
import {useAppSelector} from "@/lib/hooks";

const SquarePreview: React.FC = () => {
    const squares = useAppSelector(state => state.main.squares)

    return (
        <div style={{ position: 'relative', width: '500px', height: '500px', border: '1px solid #ccc' }}>
            {squares.map((square, index) => (
                <div
                    key={index}
                    style={{
                        width: `${square.width || 100}px`,
                        height: `${square.height || 100}px`,
                        background: square.color,
                        position: 'absolute',
                        left: square.x,
                        top: square.y,
                        transform: `rotate(${square.rotate || 0}deg)`,
                    }}
                />
            ))}
        </div>
    );
};

export default SquarePreview;
