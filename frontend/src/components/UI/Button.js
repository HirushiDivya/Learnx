import React from 'react';

// A simple button component with custom styles
export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      {children}
    </button>
  );
}
