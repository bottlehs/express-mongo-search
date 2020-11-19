var Content = require('../models/Content');
var contentController = {};

// 전체 직원 목록 보기
contentController.list = function (req, res) {
  Content.find({}).exec(function (err, contents) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render('../views/contents/index', {contents : contents});
    };
  });
};

// id 로 단일 직원 표시
contentController.show = function (req, res) {
  Content.findOne({_id: req.params.id}).exec(function(err, content) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render('../views/contents/show', {content: content});
    };
  });
};

// 직원추가
contentController.create = function (req, res) {
  res.render('../views/contents/create');
};

// 직원 저장
contentController.save = function (req, res) {
  var content = new Content(req.body);
  content.save(function(err) {
    if(err) {
      console.log(err);
      res.render('../views/contents/create');
    } else {
      console.log('Successfully create an content');
      res.redirect(`/contents/show/${content.id}`)
    };
  });
};

// 직원 편집
contentController.edit = function(req, res) {
  Content.findOne({_id: req.params.id}).exec(function(err, content) {
    if(err) {
      console.log(`Error : ${err}`);
    } else {
      res.render('../views/contents/edit', {content: content});
    };
  });
};

// 편집된 직원 업데이트
contentController.update = function(req, res) {
  Content.findByIdAndUpdate(
    req.params.id, { $set: {
      name: req.body.name,
      address: req.body.address,
      position: req.body.position,
      salary: req.body.salary
    }},

    {new: true}, function (err, content) {
      if(err) {
        console.log(err);
        res.render('../views/content/edit', {content: req.body});
      } else {
        res.redirect(`/contents/show/${content._id}`);
      };
  });
};

// 단일 직원 데이터 제거
contentController.delete = function(req, res) {
  Content.remove({_id:req.params.id}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Content deleted!!');
      res.redirect('/contents');
    };
  });
};

module.exports = contentController;