const trainerModel = require('../models/trainerModel');

class trainerController{

static async getAll(req,res){
    try{

        const trainers=await trainerModel.getAllTrainers;
        return res.status(200).json(trainers);
    }catch(error){
       return res.status(400).json({error:'error loading all trainers'});
    }

} 


static async getTrainerById(req,res){
    try {
            const { id } = req.params;
            const trainer = await TrainerModel.findById(id);

            if (!trainer) {
                return res.status(404).json({ error: 'Trainer not found.' });
            }

            return res.status(200).json(trainer);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
}
static async  updateTrainer(req,res){
    try{
        
        const { id } = req.params;
        const { specialization, bio, experience_years } = req.body;
        const trainerfind = await trainerModel.getTrainerById(id);

        if(!trainerfind){
            return res.status(404).json({ error: 'Trainer not found.' });
        }
        if (specialization === undefined &&bio === undefined &&experience_years === undefined)
             {
                return res.status(400).json({
                    error: 'Provide at least one field to update (specialization, bio, or experience_years).'
                });
            }
        const updatedSpecialization = specialization ?? trainerfind.specialization;
        const updatedBio = bio ?? trainerfind.bio;
        const updatedExperienceYears = experience_years ?? trainerfind.experience_years;

        
    }catch(error){

    }
}
static async addTrainer(req, res) {
    try {
        const { user_id, specialization, bio, experience_years } = req.body;

        if (!user_id || !specialization) {
            return res.status(400).json({
                error: 'user_id and specialization are required.'
            });
        }

        const trainerId = await TrainerModel.addTrainer(
            user_id,
            specialization,
            bio,
            experience_years
        );

        return res.status(201).json({
            message: 'Trainer added successfully.',
            trainerId
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'This user is already registered as a trainer.' });
        }
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(404).json({ error: 'Referenced user_id does not exist.' });
        }
        return res.status(500).json({ error: error.message });
    }
}

static async removeTrainer(req, res) {
    try {
        const { id } = req.params;
        const affectedRows = await TrainerModel.removeTrainer(id);

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Trainer not found.' });
        }

        return res.status(200).json({ message: 'Trainer removed successfully.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}


}
module.exports= trainerController;