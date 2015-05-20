var models = require('../models/models.js');

//GET /quizes/statistics
exports.statistics = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		var nPreg = quizes.length;
			models.Comment.findAll().then(function(comments){
				var nComents = comments.length;
				var nMedComPre = nComents/nPreg;
				var nPregSinCom = 0;
				var nPregConCom = 0;
				var i;
				for(i=0; i<nPreg; i++){
						for(i=0; i<nComents; i++){
							if(comments[i].quizId){
								nPregSinCom++;
								break;
							}
						}break;
				}
				nPregConCom=(nPreg-nPregSinCom);
			res.render('quizes/statistics', {quizes: quizes, 
											preguntas: nPreg, 
											comentarios: nComents, 
											nMedComPre: nMedComPre, 
											nPregSinCom: nPregSinCom, 
											nPregConCom: nPregConCom, 
											errors: []});
		}).catch(function(error){next(error);})
	}).catch(function(error){next(error);})
};