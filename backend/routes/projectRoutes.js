const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { ensureAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');




router.post('/createProject', ensureAuth, requireRole('Admin'), async (req, res) => {
  try {
    const { name, location, phone, email, startDate, endDate } = req.body;

    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Phone must be exactly 10 digits' });
    }
    const project = new Project({
      name, location, phone, email,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      createdBy: req.session.user.id
    });

    await project.save();
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success:false, error: err.message });
  }
});


router.get('/all', ensureAuth, requireRole('Admin'), async (req, res) => {
  const projects = await Project.find().populate('pendingRequests accessGrantedTo createdBy', 'username email role');
  res.json({ success:true, projects });
});


router.post('/:projectId/request-access', ensureAuth, async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) 
    return res.status(404).json({ error: 'Project not found' });

  const uid = req.session.user.id;
  if (project.pendingRequests.includes(uid) || project.accessGrantedTo.includes(uid)) {
    return res.status(400).json({ error: 'Already requested or access already granted' });
  }
  project.pendingRequests.push(uid);
  await project.save();
  res.json({ success:true });
});


router.post('/:projectId/approve-request', ensureAuth, requireRole('Admin'), async (req, res) => {
  const { userId, action } = req.body;
  const project = await Project.findById(req.params.projectId);
  if (!project) 
    return res.status(404).json({ error: 'Project not found' });

  project.pendingRequests = project.pendingRequests.filter(id => id.toString() !== userId);
  if (action === 'approve') {
    if (!project.accessGrantedTo.includes(userId)) project.accessGrantedTo.push(userId);
  }
  await project.save();
  res.json({ success:true, project });
});


router.get('/requestable', ensureAuth, async (req, res) => {
  const projects = await Project.find({},{ name: 1 } );

  res.json({ success: true, projects });
});


router.get('/', ensureAuth, async (req, res) => {
  if (req.session.user.role === 'Admin') {
    const all = await Project.find().populate('createdBy', 'username email');
    return res.json({ success:true, projects: all });
  } 
  else {
    const projects = await Project.find({ accessGrantedTo: req.session.user.id });
    return res.json({ success:true, projects });
  }
});




module.exports = router;
