var models = require('../models/models.js');

// GET /quizes/:id
exports.show = function(req,res) { //para la lista de preguntas
	models.Quiz.find(req.params.quizId).then(function (quiz) {
 		res.render('quizes/show', {quiz: quiz});
 	})
};

// GET /quizes/answer
exports.answer = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', {respuesta: '¡Que listo eres!', 
				quizId: req.params.quizId});
		}else {
			res.render('quizes/answer', {respuesta: 'Maaaal', 
				quizId: req.params.quizId});
		}
	})
};

//GET /quizes
//GET /quizes?search=texto_a_buscar
exports.index = function(req,res) {
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
};
//GET /author
exports.author = function(req, res){
	res.render('author', {autor: 'Andrea Esteban'})
}

