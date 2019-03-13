/**
 * @fileoverview Implementation of routes for interfacing with the 'diarys' model.
 * @author jack.pickett@uea.ac.uk (Jack Pickett)
 */

const router = require('express').Router();
const jsonParser = require('body-parser').json();
const authCheck = require('../middleware/checkAuth');
const diarysModel = require('./diaries-model');
const diaryEntriesModel = require('./diary-entries-model');


router.get('/', authCheck, (req, res, next) => {
    diarysModel.getDiarys()
        .then(results => {
            return res.status(200).json({
                count: results.length,
                results: results
            })
        })
        .catch(error => {
            next(error)
        })
});

router.post('/createDiary', authCheck, jsonParser, (req, res, next) => {
    // Check request body
    if (!req.body || Object.keys(req.body).length === 0) {
        error = new Error(message = "Missing body in request", status = 400)
        next(error)
    }

    diarysModel.createDiary(req.body.userID, req.body.diaryName, req.body.duration)
        .then(diaryDoc => {
            return res.status(201).json({
                message: "Successfully created new diary",
                diary: diaryDoc
            })
        })
        .catch(error => {
            next(error)
        })

})


router.get('/:userID', authCheck, (req, res, next) => {
    diarysModel.getDiarys(filter = { userID: req.params.userID })
        .then(results => {
            return res.status(200).json({
                count: results.length,
                results: results
            })
        })
        .catch(error => {
            next(error)
        })
});


router.get('/:userID/:diaryID', authCheck, (req, res, next) => {
    diaryEntriesModel.getDiaryEntries(filter = { diaryID: req.params.diaryID })
        .then(results => {
            return res.status(200).json({
                count: results.length,
                results: results
            })
        })
        .catch(error => {
            next(error)
        })
})


router.post('/:userID/:diaryID/create', authCheck, jsonParser, (req, res, next) => {
    // Check the request contains a body
    if (!req.body || Object.keys(req.body).length === 0) {
        error = new Error(message = "Missing body in request", status = 400)
        next(error)
    }

    var args = {
        diaryID: req.body.diaryID,
        drinkType: req.body.drinkType,
        volume: req.body.volume,
    }
    
    if (req.body.hasOwnProperty('alcoholic'))
        args.alcoholic = req.body.alcoholic

    if (req.body.hasOwnProperty('caffeinated'))
        args.caffeinated = req.body.caffeinated

    // Create the new entry in the database
    diaryEntriesModel.createEntry(args)
        .then(result => {
            return res.status(201).json({
                message: "Successfully created diary entry",
                entry: result
            })
        })
        .catch(error => {
            next(error)
        })
})



module.exports = router;