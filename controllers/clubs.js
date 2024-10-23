const { query } = require("express");
const Club = require("../models/Club.js");

// @desc    Get all hotels
// @route   Get /api/v1/hotels
// @access  Public
exports.getClubs = async (req, res, next) => {
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
    query=Club.find(JSON.parse(queryStr));
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
        const clubs = await query;
        res.status(200).json({success:true, count:clubs.length, data:clubs});
    } catch(err){
        res.status(400).json({success:false});
        console.log(err);
    }
};

// @desc    Get single hotel
// @route   Get /api/v1/hotels/:id
// @access  Public
exports.getClub = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: club });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create new hotels
// @route   POST /api/v1/hotels
// @access  Private
exports.createClub = async (req, res, next) => {
  //console.log(req.body);
  const club = await Club.create(req.body);
  res.status(201).json({ success: true, data: club });
};

// @desc    Update hotels
// @route   PUT /api/v1/hotels/:id
// @access  Private
exports.updateClub = async (req, res, next) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!club) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: club });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete hotel
// @route   DELETE /api/v1/hotels/:id
// @access  Private
exports.deleteClub = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(400).json({ success: false });
    }

    await club.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
