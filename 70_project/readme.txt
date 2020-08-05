응용 프로그래밍 프로젝트
데이터 모델링

유저
Email(PK)
비밀번호
닉네임(별명)


정리 노트 모델링
유저 이메일(FK)
NoteUniqueID(PK)
Note_Name
Subject


노트별 문제 모델링
NoteUniqueID(PFK)
Question_Image
Content(이미지, 글 모두 넣을 수 있게)
CreatedDate