// 비즈니스 정보를 담는 함수만 정의함
let nextId = 4;
let movie = [
    {id : 1, title: "스타워즈", director: "조지 루카스", year: "1977"},
    {id : 2, title: "아바타", director: "제임스 카메론", year: "2009"},
    {id : 3, title: "인터스텔라", director: "크리스토퍼 놀란", year: "2014"},
];


// 목록조회 (localhost:3000/movie)
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10); // string형 limit 10진수로, 미입력 시 10로 default
    
    if (Number.isNaN(limit)) // isNotNumber?
    {
        return res.status(400).end();
    }

    // limit수만큼 music객체를 담은 배열 리턴
    res.json(movie.slice(0, limit)); // ???
};

// 상세조회 (movie/:id)
const detail = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    // find 이용
    const result = movie.find(m => m.id === id);
    if (!result) return res.status(404).end();// undefined이면
    res.json(result);
};

// 등록 (/movie)
const create = (req, res) => {
    const { title, director, year } = req.body;
    if (!title || !director || !year) return res.status(400).end();
    const m = { id: nextId++, title, director, year }; // title : title인데 좌우가 같을 경우 title로 생략가능
    movie.push(m);
    res.status(201).json(m);
};

// 수정 (/movie/:id)
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    
    const result = movie.find(m => m.id === id); // result 자체는 변경이 안되고 그 안에 있는 데이터만 Replace됨. 그러므로
    // const 사용 가능
    if (!result) return res.status(404).end();

    const { title, director, year } = req.body;

    if (title) result.title = title;
    if (director) result.director = director;
    if (year) result.year = year;
    res.json(result);
};

// 삭제 (/movie/:id)
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) res.status(400).end();

    const result = movie.find(m => m.id === id)
    if (!result) return res.status(404).end();

    movie = movie.filter(m => m.id !== id); // {2, 3}
    res.json(movie);
};

module.exports = { list, detail, create, update, remove };