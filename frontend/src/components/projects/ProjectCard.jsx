import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-[#2f2f2f] rounded-lg p-5 space-y-1  text-gray-300">
      <h2 className="text-3xl mb-5">{project.name}</h2>
      <p>Location: {project.location}</p>
      <p>Contact: {project.phone}</p>
      <p>Email: {project.email}</p>
      <p>Start: {project.startDate?.slice(0,10)}</p>
      <p>End: {project.endDate?.slice(0,10)}</p>
    </div>
  );
}
