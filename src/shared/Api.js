import axios from 'axios';


// 싱글톤 패턴으로 axios 인스터스를 생성
export const api = axios.create({
    baseURL:"http://miniproject.ap-northeast-2.elasticbeanstalk.com",
    headers:{
            /* */
    },
})


export const AuthApi = {
    signin: (payload)=> api.post('/signin', payload),
    signup: (payload)=> api.post('/register', payload),
}