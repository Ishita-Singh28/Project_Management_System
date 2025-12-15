import React from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {projects.map(p => (
        <ProjectCard key={p._id} project={p} />
      ))}
    </div>
  );
}
