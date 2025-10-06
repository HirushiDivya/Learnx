import React from 'react';

export function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-lg rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return <h3 className={`text-lg font-semibold text-gray-700 mb-2 ${className}`}>{children}</h3>;
}

export function CardContent({ children, className }) {
  return <p className={`text-gray-600 mb-4 ${className}`}>{children}</p>;
}
