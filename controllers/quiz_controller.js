var models = require('../models/models.js');

//Autoload -factoriza el codigo sin ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{next(new Error('No existe quizId=' + quizId));}
		}
	).catch(function(error){next(error);});
};

//GET /quizes
//GET /quizes?search=texto_a_buscar
exports.index = function(req,res) {
	if (req.query.search != null) {
		models.Quiz.findAll({where: ["pregunta like ?", '%'+req.query.search+'%'], order:'pregunta ASC'})
		.then(function (quizes) {
			res.render('quizes/index', {quizes: quizes, errors: []});
		});
	}else {
		models.Quiz.findAll().then(function (quizes) {
			res.render('quizes/index', {quizes: quizes, errors: []});
		});
	}
};
/*exports.index=function(req,res){
		models.Quiz.findAll().then(
			function(quizes){
				res.render('quizes/index', {quizes: quizes});
			}
		).catch(function(error){next(error);})
};*/

// GET /quizes/:id
exports.show = function(req,res) { //para la lista de preguntas
 	res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Maaaal';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado='¡Que listo eres!';		
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors:[]});
};

//GET /quizes/new
exports.new = function(req,res){
	var quiz= models.Quiz.build( //crea objeto quiz
		{pregunta:"Pregunta", respuesta: "Respuesta"}
	);
	res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz );

	quiz
	.validate()
	.then(
		function(err){
			if (err) {
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
			quiz // save: guarda en DB campos pregunta y respuesta de quiz
			.save({fields: ["pregunta", "respuesta"]})
			.then( function(){ res.redirect('/quizes')})
			} // res.redirect: Redirección HTTP a lista de preguntas
		}
	);
};
//GET /author
exports.author = function(req, res){
	res.render('author', {autor: 'Andrea Esteban', errors: []})
}

