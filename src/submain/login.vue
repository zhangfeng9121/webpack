<!-- .vue -->
<template>
    <div>
        <h3>登陆组件</h3>

        <mt-button type="default">default</mt-button>
        <mt-button type="primary">primary</mt-button>
        <mt-button type="danger">danger</mt-button>


        <!--mui-->
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">登录</h1>
        </header>
        <div class="mui-content">
            <form id='login-form' class="mui-input-group">
                <div class="mui-input-row">
                    <label>账号</label>
                    <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
                </div>
            </form>
            <form class="mui-input-group">
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                        自动登录
                        <div id="autoLogin" class="mui-switch">
                            <div class="mui-switch-handle"></div>
                        </div>
                    </li>
                </ul>
            </form>
            <div class="mui-content-padded">
                <button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
                <div class="link-area"><a id='reg'>注册账号</a> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
                </div>
            </div>
            <div class="mui-content-padded oauth-area">

            </div>
        </div>
        <!--/mui-->
    </div>
</template>

<script>

</script>

<style>
    
</style>