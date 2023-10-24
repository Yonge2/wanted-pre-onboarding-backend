# Wanted-Pre-Onboarding-Backend <BR><BR> 채용 게시판 구현하기 - 이재용

## 평가 체크리스트
 - 요구사항 구현(가산점 포함) O
 - 모델링 O
 - 코드 가독성 코드 컨벤션 (노력O)
 - ORM, RDBMS 사용 O
 - Unit Test O
 - README 요구사항 분석 및 구현과정 작성 O
 - Git message convetion O
<br>

## 목차
1. 개요
2. 설계
3. 구현
4. 테스트


## 1. 개요
본 과제는 원티드 프리온보딩 백엔드 인턴십 참여를 위한 사전 과제 입니다.


### 사용기술
```
{
    Language&Framework : [nodejs, expressjs],

    Library: Sequelize,

    RDBMS : MySQL,

    API Docs : Postman Api Docs,

    Test : {
        Api test : Postman,
        Unit test : jest
    }
}
```
<br>

### 기술 및 도구 선택
<br>빠르게 개발 후 제출하기 위해 익숙한 javascript/nodejs 를 선택했습니다.<br><br>
ORM 사용은 처음이기 때문에 자료가 많은 조합인 express, mysql, sequelize 을 선택했습니다.<br><br>
Unit 테스트는 Jest를 이용하여 함수 단위로 모두 테스트 했습니다.<br><br>
통합테스트 + API 테스트는 테스트와 API 문서 작성을 동시에 진행할 수 있는 Postman을 사용했습니다.<br><br>

### 요구사항
```
 - 본 서비스는 기업의 채용을 위한 웹 서비스 입니다. 
 - 회사는 채용공고를 생성하고, 이에 사용자는 지원합니다.
```

1. 회사는 채용공고를 등록할 수 있습니다.
2. 회사는 회사 id 외에 채용공고를 수정할 수 있습니다.
3. 회사는 채용공고를 삭제할 수 있습니다.
4. 사용자 및 회사는 채용공고를 불러올 수 있으며, 검색할 수 있습니다.
5. 채용 상세페이지에 접속하면, 자세한 내용과 해당 회사가 올린 다른 공고를 볼 수 있습니다.
6. 사용자는 공고당 한 번 지원할 수 있습니다.
<br>

### 고려 사항 / 해결 방법
```
 - ORM 사용하여 구현 
   -> Sequelize-MySQL 사용하여 구현.

 - 회원가입/로그인 생략 
   -> Custom header 이용하여 간단한 인증 구현(사용방법 : API 문서)

 - DB에 데이터 임의 생성
   -> app.js 실행 1초 후, init()함수를 작동시켜 초기 데이터 세팅
```
<br>



## 2. 설계
### 모델링
```
 회사, 사용자, 채용공고, 지원내역 포함할 것.
```
![pre-onboarding-erd drawio](https://github.com/Yonge2/wanted-pre-onboarding-backend/assets/99579139/f9f59948-401f-4940-a234-b65806c4c93b)
```
user : user_apply => 1 : N<br>
company : board => 1 : N<br>
user_apply : board => 1 : 1
```

### Server Structure
![pre-onboarding-directory](https://github.com/Yonge2/wanted-pre-onboarding-backend/assets/99579139/52b57b4e-0834-4764-9230-3f4707de7b70)
```
Monolothic Archetecture

서버 구조가 상당히 간단하기 때문에 MA구조를 선택했습니다.
모든 부분이 연결 되어 있고, app.js를 바라보고 있습니다.
```



## 3. 구현
### 0.공통
#### 자세한 요청&응답형식과 샘플은 [API문서를](https://documenter.getpostman.com/view/21311885/2s9YJgVM1x) 통해 확인할 수 있습니다.
<br>

``` 
 특이사항 : 사용자 인증과정은 없지만, 헤더를 커스텀하여 간단하게 접근 권한을 설정했습니다.

 headers{
    ... ,
    user_id|company_id : string
 }
```
<br>

### 1. 채용 공고 등록 (./board/boards.service/createBoard)
[코드링크](https://github.com/Yonge2/wanted-pre-onboarding-backend/blob/master/app/boards/boards.service/createBoard.js)
```
//FLOW
<Request>
{ header, body{생성 요소} }
        ↓
<생성 권한 확인>
header.company_id 로 db에서 해당 회사의 지역 불러오기(동시에 company_id가 올바른 값인지도 검증)
        ↓
<Insert>
body로 받은 내용을 Model에 매핑 후 삽입
        ↓
<Response>
생성 후 성공여부 Response


//특이사항
 - 회사 검증과 회사 위치 : JWT와 같은 기본정보를 담거나 인증할 수 있는 것이 없어서 DB 쿼리 작업을 2번 함.
```
<br>

### 2. 채용 공고 수정 (./board/boards.service/updateBoard)
[코드링크](https://github.com/Yonge2/wanted-pre-onboarding-backend/blob/master/app/boards/boards.service/updateBoard.js)
```
//FLOW
<Request>
{ header, body{게시물id, 회사 id} }
        ↓
<접근 권한 확인>
header.company_id와 body.company_id의 비교로 게시물 수정권한 관리
        ↓
<Update>
body로 받은 내용 매핑 후 수정
        ↓
<Response>
수정 후 성공여부 

//특이사항
 - comapny_id는 update를 위한 객체에서 제거함으로써 회사이름 변경이 불가 하도록 구현하였음.
```
<br>

### 3. 채용 공고 삭제 (./board/boards.service/deleteBoard)
[코드링크](https://github.com/Yonge2/wanted-pre-onboarding-backend/blob/master/app/boards/boards.service/deleteBoard.js)
```
특이사항 제외, 위의 채용 공고 수정(Update)과 같음.
```
<br>

### 4. 채용 공고 불러오기(검색포함) (./board/boards.service/getBoard)
[코드링크](https://github.com/Yonge2/wanted-pre-onboarding-backend/blob/master/app/boards/boards.service/getBoard.js)
```
//FLOW
<Request>
{ header?.user_id, {query?.search: string|number, query?.distanse: boolean} }
        ↓
<SELECT & Sorting>
{
    {serach: number}일 때 - 채용보상금이 number 이상인 게시물 검색
    {search: string}일 때 - 해당 단어가 포함 된 게시물 검색

    {header.user_id, distance=true}일 때 - 사용자와의 거리순으로 정렬한 모든 게시물

    {header.user_id, search.string|number, distance=true}일 때 - 검색결과를 거리순으로 정렬

    default(이외 모든 경우) - 모든 게시물 최신 순으로 정렬
}
        ↓
<Response>
정렬된 결과


//특이사항
 - 사용자 검증 : header.user_id와 distance있는 요청일 때만 사용자 검증과 지역을 불러오기 위해 DB를 call 한다.

 - 거리순 정렬 : 임의로 광역시/도 기준으로 숫자를 부여하고,
 {(사용자 지역과 회사지역의 차이 값)의 절대값}으로 거리를 구분하여 정렬했다.
```
<br>

### 5. 채용 공고 상세페이지 (./board/boards.service/getBoardDetail)
[코드링크](https://github.com/Yonge2/wanted-pre-onboarding-backend/blob/master/app/boards/boards.service/createBoardDetail.js)
```
//FLOW
<Request>
{ query.board_id & query.company_id }
        ↓
<SELECT>
company_id로 검색한 모든 게시물 불러오기
        ↓
<Filtering>
board_id = query.board_id인 게시물은 모든 내용을 resObject에 담기
그 외에의 게시물은 {board_id, title}만 others 배열에 담기
        ↓
<Response>
필터링 후 합친 Object


//특이사항
 - Join : 회사 - 게시물 (parent - child 관계) join하여 한번의 쿼리로 해결.
```
<br>

### 6. 사용자 지원 (./board/boards.service/userAply)
[코드링크](https://github.com/Yonge2/wanted-pre-onboarding-backend/blob/master/app/boards/boards.service/userApply.js)
```
//FLOW
<Request>
{ header.user_id, body(board_id) }
        ↓
<Insert into>
user_apply 테이블에 지원내역 추가
        ↓
<Response>
추가 or 추가 실패 결과

//특이사항
 - error message : 유일하게 경우의 수가 많아보여 에러 메시지를 Error.name을 이용하여 따로 핸들링.
 - user_apply model : board_id에 unique 속성을 부여하여 중복지원을 방지.
```


## 테스트

###  Unit TEST
#### Tool : Jest
 - mock 함수를 이용하여 DB에 연결하지 않고 진행.
 - service 단위로 테스트 파일을 만듦.
 - service logic 단위로 모든 함수 테스트.
 - 중복되어 불필요한 line은 생략함.
#### 총 7개의 파일, 23개의 테스트 코드 결과
![test-result](https://github.com/Yonge2/wanted-pre-onboarding-backend/assets/99579139/0e34f97c-2890-4128-b3ae-9969dd1325c2)

#### Test Coverage
![test-coverage](https://github.com/Yonge2/wanted-pre-onboarding-backend/assets/99579139/0794aee5-2116-42b9-ad41-a3055615a648)

(* Uncoverd Line : 중복되어 테스트가 불필요하다고 판단된 부분들)

## 통합테스트
#### Tool : Postman
 - 단위테스트를 마친 코드들을 실제로 http request로 올바른 response를 받는지 확인.
 - Test와 API 문서화를 동시에 진행함.
 - [API TEST 및 요청, 응답형식 (API 문서)](https://documenter.getpostman.com/view/21311885/2s9YJgVM1x)

 convential commits test
