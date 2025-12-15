const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Project = require('../models/Project');


router.get('/', ensureAuth, async (req, res) => {
  try {
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    res.write('==== Project Management Report ====\n');
    res.write(`Generated at: ${new Date().toISOString()}\n\n`);

    const totalProjects = await Project.countDocuments();
    res.write(`Total Projects: ${totalProjects}\n`);

    const pendingAggregation = await Project.aggregate([
      { $project: { pendingCount: { $size: '$pendingRequests' } } },
      { $group: { _id: null, totalPending: { $sum: '$pendingCount' } } }
    ]);

    const totalPending = pendingAggregation[0]?.totalPending || 0;
    res.write(`Total Pending Access Requests: ${totalPending}\n\n`);

    
    const projects = await Project.find({}, 'name createdAt');
    res.write('Projects List:\n');

    projects.forEach((project, index) => {
      res.write(`${index + 1}. ${project.name} (Created: ${project.createdAt.toDateString()})\n`);
    });

    res.write('\n==== End of Report ====\n');
    res.end();
  } catch (err) {
    res.write('\nError generating report.\n');
    res.end();
  }
});

module.exports = router;
