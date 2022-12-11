
import {setAccessToken} from './reducers/auth'

export default function requestMiddleware () {
    return ({ dispatch, getState }) => next => (action) => {
        const refreshToken = JSON.parse(localStorage.getItem('userInfo'))?.refreshToken
        // console.log(JSON.parse(localStorage.getItem('userInfo'))?.accessToken ==  getState().user.accessToken)
        if(action?.payload?.code == "141901"){
            localStorage.removeItem('userInfo')
             dispatch(setAccessToken({token: refreshToken})).then(res => {
                console.log(res)
                if(action?.payload?.code == "141901") {
                    localStorage.removeItem('userInfo')
                    window.location.replace("/login")
                }else{
                    localStorage.setItem('userInfo', JSON.stringify(res.payload));
                }
            })
            // return next(action);
        }else if(action?.payload?.code == "141902") {
            // localStorage.removeItem('userInfo')
            window.location.replace("/login")
        }else{
            return next(action);
        }
    };
  }