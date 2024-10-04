const Application = require('../models/Application');

// Creates a new application for the authenticated user.
const createApplication = async (req, res) => {
    const {company, position, status}  = req.body;

    try {
        const application = new Application({
            user: req.user._id,
            company,
            position,
            status,
        });

        const createdApplication = await application.save();
        res.status(201).json(createdApplication);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

// Retrieves all applications for the authenticated user.
const getApplications = async (req, res) => {
    try {
        const { company, position, status } = req.query; 
        
        const query = {
          user: req.user._id, 
        };
    
        // Add search filters to the query if they exist
        if (company) {
          query.company = { $regex: company, $options: 'i' };
        }
        if (position) {
          query.position = { $regex: position, $options: 'i' };
        }
        if (status) {
          query.status = status;
        }
    
        const applications = await Application.find(query);
        res.json(applications); 
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

// Updates an existing application for the authenticated user.
const updateApplication = async (req, res) => {
    const {id} = req.params;
    const {company, position, status} = req.body;
    
    try {
        const application = await Application.findById(id);

        if (!application) {
            return res.status(404).json({message: 'Application not found'});
        }

        if (application.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: 'Not authorized'});
        }

        application.company = company || application.company;
        application.position = position || application.position;
        application.status = status|| application.status;

        const updateApplication = await application.save();
        res.json(updateApplication);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

// Deletes an application for the authenticated user.
const deleteApplication = async (req, res) => {
    const {id} = req.params;

    try {
        const application = Application.findById(id);

        if(!application){
            res.status(404).json({message: 'Application not found'});
        }

        if(application.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: 'Not authorized'});
        }

        await application.remove();
        res.json({message: 'Application removed'});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {createApplication, getApplications, updateApplication, deleteApplication};