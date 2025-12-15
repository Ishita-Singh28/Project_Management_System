import React from 'react';
import { handleRequest } from '../../../services/api';

export default function PendingRequests({ projects, refetch }) {
  const pending = projects.flatMap(project =>
    project.pendingRequests?.map(user => ({
      user,
      project
    })) || []
  );

  if (!pending.length) return null;

  return (
    <div className="bg-[#2a2a2a] p-6 rounded-xl">
      <h3 className="mb-4 font-semibold">Pending Requests</h3>

      {pending.map(({ user, project }) => (
        <div
          key={`${user._id}-${project._id}`}
          className="flex justify-between items-center mb-3"
        >
          <span className="text-sm text-gray-300">
            {user.username} - requesting access to {project.name}
          </span>

          <div className="space-x-2">
            <button
              className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded text-sm"
              onClick={async () => {
                try {
                  await handleRequest(project._id, {
                    userId: user._id,
                    action: 'approve'
                  });
                  alert('Access granted successfully');
                  refetch();
                } catch (err) {
                  console.error(err);
                  alert('Failed to grant access');
                }
              }}
            >
              Grant Access
            </button>


            <button
              className="bg-purple-800 hover:bg-purple-900 px-4 py-1 rounded text-sm"
              onClick={async () => {
                try {
                  await handleRequest(project._id, {
                    userId: user._id,
                    action: 'deny'
                  });
                  alert('Access denied');
                  refetch();
                } catch (err) {
                  console.error(err);
                  alert('Failed to deny access');
                }
              }}
            >
              Deny Access
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}
