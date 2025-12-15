import React, { useEffect, useState } from 'react';
import { requestAccess, getRequestableProjects } from '../../../services/api';

export default function RequestAccessDropdown() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
  getRequestableProjects()
    .then(res => setProjects(res.data.projects || []))
    .catch(err => {
      console.error('Error fetching projects:', err);
    });
}, []);



  const sendRequest = async () => {
  try {
    await requestAccess(confirm._id);
    alert('Request sent successfully');
    setConfirm(null);
    setOpen(false);
  } catch (err) {
    const message =
      err.response?.data?.error ||
      'You already have access or have already requested this project';

    alert(message);
    setConfirm(null);
  }
};


  return (
    <div className="relative inline-block mb-8 w-56">


      <button
        onClick={() => setOpen(!open)}
        className=" w-full bg-gradient-to-r from-[#8521FF] to-[#AB66FF] text-white text-lg px-6 py-2 rounded-md text-sm font-semibold"
      >
        Request Access
      </button>


      {open && (
        <div className="absolute mt-2 w-full bg-[#2a2a2a] rounded-lg shadow-lg overflow-hidden">
          {projects.map(p => (
            <div
              key={p._id}
              onClick={() => setConfirm(p)}
              className="px-4 py-2 text-sm text-white hover:bg-[#3a3a3a] cursor-pointer"
            >
              {p.name}
            </div>
          ))}
        </div>
      )}

      {confirm && (
        <div className="absolute left-60 top-0 bg-[#2a2a2a] rounded-lg p-4 w-48">
          <p className="text-sm mb-3 text-gray-300">
            Are you sure?
          </p>

          <div className="flex gap-2">
            <button
              onClick={sendRequest}
              className="bg-purple-600 px-3 py-1 rounded text-sm"
            >
              Yes
            </button>

            <button
              onClick={() => setConfirm(null)}
              className="bg-purple-800 px-3 py-1 rounded text-sm"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
