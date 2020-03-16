const Mongoose = require("mongoose");

Mongoose.connect(
	"mongodb://augustoscher:minhasenhasecreta@localhost:27017/heroes",
	{ useNewUrlParser: true },
	error => {
		if (error) {
			console.log("Connection Error: ", error);
		}
	}
);

const connection = Mongoose.connection;
connection.once("open", () => {
	console.log("Database rodando!")
	this._connection = connection;
});

const heroeSchema = new Mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	power: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
});

const model = Mongoose.model('heroe', heroeSchema);

const main = async () => {
	const res = await model.create({
		name: 'Batman',
		power: 'Money'
	});
	console.log('Cadastrar: ', res);
	console.log();

	console.log('--- List ---')
	const list = await model.find();
	console.log(list);

}

main();