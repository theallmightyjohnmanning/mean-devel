module.exports = function(db) {

	db.model('test', {

		name: String,
		email: String,
		username: String
	}, 'test');
}