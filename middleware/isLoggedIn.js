// write a function we are going to use as middleware
module.exports = function(req, res, next) {
    if (!req.user) {
        req.flash('error', 'must be logged in to view page.');
        res.redirect('/auth/login');
    }else {
        next();
    }
}