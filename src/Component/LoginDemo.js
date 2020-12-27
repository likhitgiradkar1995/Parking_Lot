import React from 'react'
import styles from '../Css/styles.module.css';

function LoginDemo() {
    return (
        <div>
            <div >
                <form className={styles.authinner}>
                    <h3>Admin Login</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginDemo
