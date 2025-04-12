import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <div>
        {children}
      </div>
    </div>
  );
}