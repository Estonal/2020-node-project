const MovieModel = require("../../models/movie");
const mongoose = require("mongoose");

// id 유효성 체크
const checkId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) { // true or false 유효한 Id인지
        return res.status(400).end();
    }
    next();
};

const list = (req, res) => {
    // limit - String으로 받아짐
    const limit = parseInt(req.query.limit || 10, 10);
    
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }

    MovieModel.find((err, result) => {
        if (err) return res.status(500).end(); //next(err); // throw err;
        res.render("movie/list", { result });
    })
        .limit(limit)
        .sort({_id: -1});
};

// 상세조회 (localhost:3000/api/music/:id)

const detail = (req, res) => {
    const id = req.params.id;

    //if (!mongoose.Types.ObjectId.isValid(id)) { // true or false 유효한 Id인지
    //    return res.status(400).end();
    //}
    
    // 1. FindById()
    /*
    MusicModel.findById(id, (err, result) => {
        if (err) throw err;
        if (!result) return res.status(404).end();
        res.json(result);
    });
    */

    // 2. findOne()
    MovieModel.findOne({ _id: id }, (err, result) => { //_id로 받을꺼면 차라리 걍 findById를 써라
        if (err) return res.status(500).end();//throw err;
        if (!result) return res.status(404).end();
        //res.json(result);
        res.render("movie/detail", {result});
    });

};

// 등록 (localhost:3000/api/music)
// - 성공 : 등록한 music 객체를 리턴 (201: Created)
// - 실패 : singer, title 값 누락 시 400 반환 (400: Bad Request) 500: ServerError
const create = (req, res) => {
    const { title, director, year } = req.body;
    if (!title || !director || !year) return res.status(400).end("필수항목이 입력되지 않았습니다.");
    const m = { title, director, year };

    // 1. Model 객체인 Document 생성 후 save
    /*
    const music = new MusicModel({ singer, title });
    music.save((err, result) => {
        //       직접 에러처리 설정 if (err) return res.status(500).send("DB ERROR");
        if (err) throw err;
        res.status(201).json(result);
  
    });
    */

    // 2. Model.Create()
    MovieModel.create({ title, director, year }, (err, result) => {
        if (err) return res.status(500).send("등록 시 오류가 발생했습니다.");//throw err;
        res.status(201).json(result);
    });
};

// 수정 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 music 객체에 입력데이터로 변경
//          해당 객체를 반환(200: OK)
// - 실패 : 유효한 id가 아닐 경우 (400: Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const update = (req, res) => {
    const id = req.params.id;
    //if (!mongoose.Types.ObjectId.isValid(id)) { // true or false
    //    return res.status(400).end();
    //}

    //FindByIdAndUpdate
    const { title, director, year } = req.body;
    MovieModel.findByIdAndUpdate(
        id,
        { title, director, year },
        { new: true }, // 업데이트된 결과가 나옴
        (err, result) => {
            if (err) return res.status(500).send("수정 시 오류가 발생했습니다."); //throw err;
            if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
            res.json(result);
    });
};

// 삭제 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 객체를 배열에서 삭제 후 결과 배열 리턴 (200: OK)
// - 실패 : id가 유효하지 않는 경우 (400: Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const remove = (req, res) => {
    
    const id = req.params.id;

    //유효한 id인지 체크
    //if (!mongoose.Types.ObjectId.isValid(id)) { // true or false
    //    return res.status(400).end();
    //}

    // 삭제처리 (findByIdAndDelete)
    MovieModel.findByIdAndDelete(id, (err, result) => {
        if (err) return res.status(500).send("삭제 시 오류가 발생했습니다.");
        if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
        res.json(result);
    });
};

const showCreatePage = (req, res) => {
    res.render("movie/create");
}

const showUpdatePage = (req, res) => {
    const id = req.params.id;
    MovieModel.findById(id, (err, result) => {
        if (err) return res.status(500).send("조회 시 오류가 발생했습니다");
        if (!result) return res.status(404).send("해당하는 정보가 없습니다");
        res.render("movie/update", { result });
    });
};


module.exports = { list, detail, create, update, remove, checkId, showCreatePage, showUpdatePage};