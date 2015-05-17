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
/*exports.index = function(req,res) {
	if (req.query.search != null) {
		models.Quiz.findAll({where: ["pregunta like ?", '%'+req.query.search+'%'], order:'pregunta ASC'})
		.then(function (quizes) {
			res.render('quizes/index', {quizes: quizes});
		});
	}else {
		models.Quiz.findAll().then(function (quizes) {
			res.render('quizes/index', {quizes: quizes});
		});
	}
};*/
exports.index=function(req,res){
		models.Quiz.findAll().then(
			function(quizes){
				res.render('quizes/index', {quizes: quizes});
			}
		).catch(function(error){next(error);})
};

// GET /quizes/:id
exports.show = function(req,res) { //para la lista de preguntas
 	res.render('quizes/show', {quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Maaaal';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado='¡Que listo eres!';		
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

//GET /author
exports.author = function(req, res){
	res.render('author', {autor: 'Andrea Esteban'})
}

