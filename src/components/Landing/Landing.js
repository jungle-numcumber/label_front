import './Landing.css'

function Landing() {
    return (
        <main className="Landing__main">
            <article className="Landing__article">
            </article>
            <aside className='Landing__aside'>
                <div className="Landing__login">
                    <h1 className="Landing__login--loginText">Log In</h1>
                    <div className="Landing__login--socialLogin">
                        <img src={process.env.PUBLIC_URL + '/images/google_login_icon.png'} id='Google__login__icon'></img>
                        <div>&nbsp;&nbsp;log in with Google</div>
                    </div>
                    {/* <div className="Landing__login--or">
                        <hr className="Landing__login--hr"></hr>
                        <span className="Landing__login--or--text">or</span>
                        <hr className="Landing__login--hr"></hr>
                    </div> */}
                    <div className="Landing__login--or">or</div>
                    <form action="" method="" className="Landing__login__form">
                        <label>
                            <input type="email" placeholder="  Email" className="Landing__login--input"></input>
                        </label>
                        <label>
                            <input type="password" placeholder="  Password" className="Landing__login--input"></input>
                        </label>
                        <button type="submit" className="Landing__login--button">Log In</button>
                    </form>
                    <p style={{textAlign: 'center', fontSize: '12px'}}>By continuing, you agree to Label's Terms of Service and Privacy Policy. </p>
                </div>
            </aside>
        </main>
    );
}

export default Landing;