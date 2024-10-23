const Activity = require("../models/Activity");
const Club = require("../models/Club");

//@desc     Get all reservations
//@route    GET /api/v1/reservations
//@access   Public
exports.getActivities = async (req, res, next) => {
    let query;
    //Copy req.query
    const reqQuery = {...req.query};
    //Fields to exclude
    const removeFields=['select','sort','page','limit'];
    //Loop over remove fields and delete them from reqQuery
    removeFields.forEach(params=>delete reqQuery[params]);
    console.log(reqQuery);
    //Create query string
    let queryStr=JSON.stringify(reqQuery);
    //Create operator ($gt,$gte,etc)
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);
    //finding resource
    query=Activity.find(JSON.parse(queryStr));
    //Select Fields
    if(req.query.select){
        const fields=req.query.select.split(',').join(' ');
        query=query.select(fields);
    }
    //sort
    if(req.query.sort){
        const sortBy=req.query.sort.split(',').join(' ');
        query=query.sort(sortBy);
    }
    try{
        const activities = await query;
        res.status(200).json({success:true, count:activities.length, data:activities});
    } catch(err){
        res.status(400).json({success:false});
        console.log(err);
    }
  };
  

// @desc    Get single reservation
// @route   Get /api/v1/reservations/:id
// @access  Public
exports.getActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id)

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: `No activity with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: activity });
  } catch (err) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Activity" });
  }
};

// @desc    Add reservation
// @route   POST /api/v1/reservations/:hotelId/reservation
// @access  Private
exports.addActivity = async (req, res, next) => {
  try {
    const activity = await Activity.create(req.body);

    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot create Activity" });
  }
};

// @desc    Update reservation
// @route   PUT /api/v1/reservations/:id
// @access  Private
exports.updateActivity = async (req, res, next) => {
  
  try {
    let activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: `No activity with the id of ${req.params.id}`,
      });
    }

    activity = await Activity``.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot update Activity" });
  }
};

// @desc    Delete reservation
// @route   DELETE /api/v1/reservations/:id
// @access  Private
exports.deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: `No activity with the id of ${req.params.id}`,
      });
    }

    await activity.deleteOne();
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete Activity" });
  }
};
