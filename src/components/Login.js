import { useEffect, useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
const Login = () => {
    const { loginContext } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingApi, setLoadingApi] = useState(false);


    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("missing email or password");
            return;
        }
        setLoadingApi(true);
        let res = await loginApi(email, password);
        console.log('check res', res)
        if (res && res.token) {
            loginContext(email, res.token);
            navigate('/')
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoadingApi(false);

    }

    const handleGoback = () => {
        navigate('/');
    }
    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     if (token) {
    //         navigate('/');
    //     }
    // }, [])
    return (
        <>
            <div className=" login-container col-12 col-sm-4" >
                <div className="title">
                    Login
                </div>
                <div className="text-start my-1 h6">Email or User name (eve.holt@reqres.in)</div>
                <input placeholder="Email or Users name"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className="input-pass">
                    <input type={isShowPassword === true ? "text" : "password"} placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <i
                        className={isShowPassword === true ? "fa-regular fa-eye " : "fa-regular fa-eye-slash "}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>
                <button className={email && password ? "active" : ""}
                    disabled={email && password ? false : true}
                    onClick={() => handleLogin()}
                >
                    {loadingApi && <i className="fa-solid fa-circle-notch fa-spin"></i>}
                    &nbsp; Login
                </button>
                <div className="text-center my-3">
                    <i
                        className="fa-solid fa-arrow-left"
                    ></i> <span className="goback" onClick={() => handleGoback()}>Goback</span>
                </div>
            </div>
        </>
    )
}
export default Login;