import React, { useState } from "react";
import axios from "axios" // 서버랑 통신하는거
import '../stylesheets/register.scss'; // css
import { useHistory } from "react-router";
const Register = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordError, setPasswordError] = useState();
    const [email, setEmail] = useState('');
    const [favoritePlace, setFavoritePlace] = useState([]);
       
    const onNameChange = e => {
        setName(e.target.value)
        // console.log(e.target.value)
    }
    const onEmailChange = e => {
        setEmail(e.target.value)
        // console.log(e.target.value)
    }
    const onPasswordChange = e => {
        setPassword(e.target.value)
        // console.log(e.target.value)
    }
    const onPasswordCheck = (a) => {
        if(password !== a){
            setPasswordError(true);
        }
        else{
            setPasswordError(false);
        }
    }

    const onPasswordConfirmChange = e => {
        setPasswordConfirm(e.target.value)
        onPasswordCheck(e.target.value)
    }

    const onFavoritePlaceChange = e => {

        let str = e.target.value
        let placeList = str.split(',')

        setFavoritePlace(str)
        // console.log(e.target.value)
    } // 3개까지 검색해서 선택할 수 있게

    const onSubmit = (e) => { // 제출하면 이 입력한 정보
        e.preventDefault(); // 새로고침 안되게하는거
        axios.post('http://127.0.0.1:8000/account/signup/', { // 장고에 이 주소랑 통신해서 회원 가입함!! 형식은 POST
            username: name, // 장고 변수명: 넣어줄 우리 변수명 json형식!!!!
            password: password,
            email: email,
            favorite_place: favoritePlace 
        }) // 장고는 8000번, 리액트는 3000번 포트 사용 -> CORS 에러 생김!!!
        .then(response => {
            console.log(response.data.message)
            if(response.data.message == "success!") {
                history.push('/login')
            }
            }) // 일단 서버 대답 받아와서 콘솔로 확인해봤음!!
        .catch(err => alert("이미 등록된 사용자입니다."));
        
    }
    return (
        <div className = "register">
            <h1 id = "mimirok_title">MIMIROK</h1>
            <p className = "mimirok_info">아름다운 맛의 기록</p>
            <h1 id = "register_title">회원가입</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <div className = "register-label">
                        <p className="necessary">*</p>
                        <p>이름</p>
                    </div>
                    <input type="text" value={name} placeholder="이름" onChange={onNameChange} required/>
                </div>
                <div>
                    <div className = "register-label">
                        <p className="necessary">*</p>
                        <p>이메일</p>
                    </div>
                    <input type="email" value={email} placeholder="mimirok@co.kr" onChange={onEmailChange} required/>
                </div>
                <div>
                    <div className = "register-label">
                        <p className="necessary">*</p>
                        <p>비밀번호</p>
                    </div>
                    <input type="password" value={password} placeholder="비밀번호" onChange={onPasswordChange} required/>
                </div>
                <div>
                    <div className = "register-label">
                        <p className="necessary">*</p>
                        <p>비밀번호 확인</p>
                    </div>
                    <input type="password" value={passwordConfirm} placeholder="비밀번호확인" onChange={onPasswordConfirmChange} required/>
                    {passwordError && <p>비밀번호 틀림</p>}
                </div>
                <div>
                <div className = "register-label">
                        <p className="necessary">*</p>
                        <p>좋아하는 장소</p>
                    </div>
                    <input type="text" value={favoritePlace} placeholder="최대 3개" onChange={onFavoritePlaceChange} required/>
                </div>
                <div className="just-register-line"/>
                <div>
                    <input type="submit" value="회원가입" id = "register-submit-button"/>
                </div>
            </form>
        </div>
    )
}

export default Register;

// 뭐 ? 상황1 : 상황2