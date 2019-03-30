/**
 * @fileoverview Implementation of routes for interfacing with the 'diarys' model.
 * @author jack.pickett@uea.ac.uk (Jack Pickett)
 */

// Express imports
const router = require('express').Router();
// Database model imports
const diarysModel = require('./diaries-model');
const diaryEntriesModel = require('./diary-entries-model');
const permissionsModel = require('../permissions/model');
const volumesModel = require('../volumes/volumes-model');
// Exception imports
const NoResultException = require('../../exceptions/no-result-exception');
const PermissionException = require('../../exceptions/permission-exception');
// Middleware imorts
const jsonParser = require('body-parser').json();
const authCheck = require('../middleware/checkAuth');
const asyncHandler = require('../middleware/async-handler')
// Utility imports 
const BodyValidatior = require('../helpers/validate-request-body')


/**
 * async handler
 * Returns the volume configurations stored in the database
 */
router.get('/getVolumes', authCheck, asyncHandler(async (req, res, next) => {
    const results = await volumesModel.getVolumes()
    res.status(200).json({ results: results })
}))


/**
 * Async handler
 * Returns the diaries associated with the user account making the request
 */
router.get('/getDiaries', authCheck, asyncHandler(async (req, res, next) => {
    // Request diaries from database using the ID associated with the authentication token
    const results = await diarysModel.getDiarys(filter = { userID: req.userData._id })

    // Send response containing returned diaries
    return res.status(200).json({
        count: results.length,
        results: results
    })
}))


/**
 * Async handler
 * Returns the diaries associated with the provided userId in the URL
 */
router.get('/getDiaries/:userId', authCheck, asyncHandler((req, res, next) => {
    // Check permissions
    // TODO : implement handler
}));


/**
 * Async handler
 * Creates a new diary associated to the requesting account
 */
router.post('/createDiary', authCheck, jsonParser, asyncHandler(async (req, res, next) => {
    const expectedArguments = [
        { name: "diaryName", type: BodyValidatior.Types.String },
        { name: "startDate", type: BodyValidatior.Types.Date },
        { name: "endDate", type: BodyValidatior.Types.Date }
    ]

    // Validate the request body against the expected arguments
    req.body = await BodyValidatior.validateRequestBody(req.body, expectedArguments)

    // Create diary entry in database
    var newDiary = await diarysModel.createDiary(req.userData._id, req.body.diaryName, req.body.startDate, req.body.endDate)
    return res.status(200).json(newDiary)
}));


/**
 * Async handler
 * Subscribes the requesting account to a pre-configured diary study
 */
router.post('/subscribeToDiary', authCheck, jsonParser, asyncHandler(async (req, res, next) => {
}));


/**
 * Aysnc handler
 * Returns information and enteries for a targeted diary
 * that is associated with the requesting account.
 */
router.get('/:diaryID', authCheck, asyncHandler(async (req, res, next) => {
    // Check the requested diary belongs to the requesting user
    const results = await diarysModel.getDiarys({ _id: req.params.diaryID, userID: req.userData._id })
    if (results < 1) { throw new NoResultException('Requested diary does not exist.') }
    const diary = results[0]

    // Retrieve diary entries for the requested diary
    diaryEntriesModel.getDiaryEntries({ diaryID: diary._id })
        .then(results => {
            res.status(200).json({
                info: {
                    diaryId: diary._id,
                    userId: diary.userID,
                    diaryName: diary.diaryName,
                    entryCount: diary.totalEntries,
                    startDate: diary.startDate,
                    endDate: diary.endDate,
                },
                entries: results
            })
        })
}));


/**
 * Aysnc handler
 * Creates a new diary entry in the diary with the specified diary ID
 */
router.post('/:diaryId/createEntry', authCheck, jsonParser, asyncHandler(async (req, res, next) => {
    const expectedArguments = [
        { name: "drinkName", type: BodyValidatior.Types.String},
        { name: "brand", type: BodyValidatior.Types.String, required: false},
        { name: "volume", type: BodyValidatior.Types.Number},
        { name: "measure", type: BodyValidatior.Types.String},
        { name: "alcohol", type: BodyValidatior.Types.Boolean},
        { name: "alcoholPercentage", type: BodyValidatior.Types.Number, required: false },
        { name: "caffeine", type: BodyValidatior.Types.Boolean},
        { name: "caffeineContent", type: BodyValidatior.Types.Number, required: false }
    ]

    // Validate the body request against the expected arguments
    req.body = await BodyValidatior.validateRequestBody(req.body, expectedArguments)

    // Check requesting account has permission
    const hasPermission = await permissionsModel.checkRolePermission(req.userData.role, "canCreateDiary")
    if (!hasPermission) { throw new PermissionException() }

    // Create new diary entry
    const args = {
        drinkName: req.body.drinkName,
        brand: req.body.brand,
        containsAlcohol: req.body.alcohol,
        alcoholPercentage: req.body.alcoholPercentage,
        containsCaffeine: req.body.caffeine,
        caffeineContent: req.body.caffeineContent,
        volume: { amount: req.body.volume, measure: req.body.measure }
    }
    const newEntry = await diaryEntriesModel.createEntry(req.userData._id, req.params.diaryId, args)
    return res.status(201).json(newEntry)
   
}));


/**
 * Aysnc handler
 * Updates a diary entry associated with the targeted diary ID
 */
router.post('/:diaryId/updateEntry', authCheck, jsonParser, asyncHandler(async (req, res, next) => {
    const expectedArguments = [
        { name: "drinkName", type: BodyValidatior.Types.String },
        { name: "brand", type: BodyValidatior.Types.String, required: false },
        { name: "volume", type: BodyValidatior.Types.Number },
        { name: "measure", type: BodyValidatior.Types.String },
        { name: "alcohol", type: BodyValidatior.Types.Boolean },
        { name: "alcoholPercentage", type: BodyValidatior.Types.Number, required: false },
        { name: "caffeine", type: BodyValidatior.Types.Boolean },
        { name: "caffeineContent", type: BodyValidatior.Types.Number, required: false }
    ]

    // Validate the body request against the expected arguments
    req.body = await BodyValidatior.validateRequestBody(req.body, expectedArguments)

    // Check requesting account has permission
    const hasPermission = await permissionsModel.checkRolePermission(req.userData.role, "canUpdateUserDiary")
    if (!hasPermission) { throw new PermissionException() }

    // Check requesting user is the owner of the diary
    const args = {
        drinkName: req.body.drinkName,
        brand: req.body.brand,
        containsAlcohol: req.body.alcohol,
        alcoholPercentage: req.body.alcoholPercentage,
        containsCaffeine: req.body.caffeine,
        caffeineContent: req.body.caffeineContent,
        volume: { amount: req.body.volume, measure: req.body.measure }
    }

    const updatedDoc = await diaryEntriesModel.updateEntry(req.userData._id, req.params.diaryId, req.body.entryId, args)
    res.status(201).json(updatedDoc)
}))


/**
 * Aysnc handler
 * Removes a diary entry associated with the targeted diary ID
 */
router.post('/:diaryId/deleteEntry', authCheck, jsonParser, asyncHandler(async (req, res, next) => {
    const deletedEntry = await diaryEntriesModel.removeEntry(req.userData._id, req.params.diaryId, req.body.entryId)
    res.status(200).json()
}));



module.exports = router;