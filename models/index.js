var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new Schema({
	title: {type: String, required: true},
	urlTitle: {type: String, required: true},
	content: {type: String, required: true},
	date: {type : Date, default: Date.now},
	status: {type: String, enum :['open','closed']},
	author: {type: Schema.Types.ObjectId, ref:'User'},
	tags : [String]
});
pageSchema.virtual('route').get(function(){
	return "/wiki/" + this.urlTitle;
});
var userSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true}
})

pageSchema.pre('validate', function(next){
	console.log("this is this: ", this);
	this.urlTitle=makeUrlTitle(this.title);
	// this.update(this, {$set: { urlTitle: makeUrlTitle(this.title) }});
	next();
})
pageSchema.statics.find = function (name, cb){
	return this.find({tags: {$in: [name]}}).exec()
}
var Page = mongoose.model("Page", pageSchema);
var User = mongoose.model("User", userSchema);

function makeUrlTitle (titleString){
	return titleString.replace(/\s+/g,"_")
		.replace(/\W+/g,"")
}

module.exports = {
	Page: Page,
	User: User
};