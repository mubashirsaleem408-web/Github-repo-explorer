import React from 'react'

function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-pulse">
      <div className="h-5 w-32 bg-border-subtle rounded mb-6" />

      <div className="bg-bg-card-solid border border-border-subtle rounded-2xl p-8 flex flex-col sm:flex-row gap-6 mb-10">
        <div className="w-28 h-28 rounded-full bg-border-subtle shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-48 bg-border-subtle rounded" />
          <div className="h-4 w-32 bg-border-subtle rounded" />
          <div className="h-4 w-full max-w-md bg-border-subtle rounded" />
          <div className="h-4 w-64 bg-border-subtle rounded" />
        </div>
      </div>

      <div className="h-6 w-40 bg-border-subtle rounded mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-bg-card-solid border border-border-subtle rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default ProfileSkeleton
