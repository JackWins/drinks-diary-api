
function(res, req, next) {
    var error = new Error('Not found');
    error.status(404);
    next(error)
}