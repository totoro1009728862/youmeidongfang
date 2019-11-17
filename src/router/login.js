module.exports = [
    {
        //普通登录
        path: `/login`,
        name: 'Login',
        component: 'pages/member/login/index.vue'
    },
    // {
    //     //验证码登录
    //     path: `/login/phone`,
    //     name: 'LoginByPhone',
    //     component: 'pages/member/login/phone.vue'
    // },
    {
        //找回密码
        path: `/forgetPassword`,
        name: 'ForgetPassword',
        component: 'pages/member/login/forgot.vue'
    },
    {
        //注册账号
        path: `/registration`,
        name: 'Registration',
        component: 'pages/member/login/register.vue'
    }
]
