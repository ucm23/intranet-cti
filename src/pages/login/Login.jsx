import { useEffect } from 'react';
import '../../styles/Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { initialLoginData, initialSignon } from '../../interfaces/Login';
// import { IFetcher } from '../../interfaces/Fetcher';
import { useAuth } from '../../services/AuthContext';
// import { signon } from '../../api/auth';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import useForm from '../../hooks/useForm';
import { useCookies } from '../../services/CookieContext';

const Login = () => {
    const { login, isAuthenticated } = useAuth();
    const { setCookie } = useCookies();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const { data, handleChange } = useForm({ defaultData: initialLoginData });

    useEffect(() => {
        if (isAuthenticated) navigate(from, { replace: true });
    }, [isAuthenticated, from, navigate]);

    // const handleLogin = () => {
    //     signon(data)
    //         .then((response) => {
    //             const { fetch } = response;
    //             handleResponse(fetch);
    //         })
    //         .catch((error) => {
    //             // Manejo del error
    //         });
    // };

    // const handleResponse = (fetch: IFetcher['fetch']) => {
    //     if (typeof fetch === 'string') {
    //         // Manejar si fetch es cadena
    //     } else if (fetch instanceof Object) {
    //         if ('status' in fetch && fetch.status === 200) {
    //             const responseData = 'data' in fetch ? fetch.data : null;
    //             if (responseData) {
    //                 login(responseData);
    //             } else {
    //                 // Manejar si no hay datos en la respuesta
    //             }
    //         }
    //     }
    // };

    const onFinish = () => {
        console.log("🚀 ~ file: Index.tsx:56 ~ onFinish ~ data:", data)
        console.log("🚀 ~ file: Index.tsx:61 ~ onFinish ~ initialSignon:", initialSignon)
        login(data);
        setCookie('user', initialSignon, {
            expires: 3600, // Expires after 1hr
        });
        // handleLogin();
    };

    return (
        <div className="login-form-container">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h3>Iniciar sesión</h3>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                        size='middle'
                        name='email'
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        size='middle'
                        name='password'
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className='rememberme'>Remember me</Checkbox>
                    </Form.Item>
                    <p className="login-form-forgot">
                        <Link to="/register">Forgot password</Link>
                    </p>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    {/* Or <a href="">register now!</a> */}
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login