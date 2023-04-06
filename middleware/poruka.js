function poruka(req, res, next) {
    console.log('Poruka iz midlvera');
    next();
}
module.exports = poruka;