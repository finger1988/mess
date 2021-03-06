var mongoose = require('mongoose')
var Urlsle = mongoose.model('Urlsle')
var Tag = mongoose.model('Tag')

// 列表页
exports.list = function(req,res){
	Urlsle
	.find({})
	.sort('meta.updateAt')
	.exec(function(err,model){
		if(err){
			res.end(err)
		}
		res.json(model)
	})
}

exports.getListByID = function(req,res){
	var id = req.query.id
	Urlsle
	.findOne({_id:id})
	.exec(function(err,model){
		if(err){
			res.end(err)
		}
		res.json(model)
	})
}

exports.save = function(req,res){
	
	var form =  (req.body && req.body.form) || {}
	var _model

	form={
		title:'校园道路开放的前提，是做好解决措施',
		link:'http://news.163.com/16/0728/17/BT31GO3R00014NQF.html',
		username:'admin',
		tagName: '网易新闻'
	}

	if(form._id){
		Urlsle
		.findOne({_id:id})
		.exec(function(err,model){
			if(err){
				res.end(err)
			}
			_model = _.extend(model,form)
			_model.save(function(err,model){
				if(err){
					res.end(err)
				}
				res.json(model)
			})
		})
	}else{
		_model = new Urlsle(form)

		var tagID = form.tagID
		var tagName = form.tagName

		console.log(11111111)

		_model.save(function(err,model){
			console.log(22222)
			if(err){
				res.end(err)
			}
			// if(tagID){
			// 	Tag.findById(tagID,function(err,tag){
			// 		tag.Urlsle.push(model._id)

			// 		tag.save(function(err,tag){
			// 			res.json(tag)
			// 		})
			// 	})
			// }else if(tagName){
			// 	console.log(5555)
			// 	var tag = new Tag({
			// 		name: tagName,
			// 		Urlsle: [model._id]
			// 	})

			// 	tag.save(function(err,tag){
			// 		model.tag = tag._id
			// 		model.save(function(err,model){
			// 			if(err){
			// 				res.end(err)
			// 			}
			// 		})
			// 	})
			// }

			res.json({success:1})
		})
	}
}

exports.del = function(req,res){
	var id = req.query.id
	if(id){
		Urlsle
		.remove({_id:id})
		.exec(function(err,model){
			if(err){
				res.end(err)
			}
			res.json(model)
		})
	}
}

