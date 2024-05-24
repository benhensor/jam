import React from 'react'
import { Button } from './Styles'

export default function Add({ onClick }) {
  return (
    <Button onClick={onClick}>
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 500 450"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="256"
          y1="112"
          x2="256"
          y2="400"
          style={{ fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
        />
        <line
          x1="400"
          y1="256"
          x2="112"
          y2="256"
          style={{ fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
        />
      </svg>
    </Button>
  );
}