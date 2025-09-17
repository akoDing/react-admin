import logo from '@/assets/logo.png'
import stylue from './index.module.less'

const Logo = () => {
    return (
        <div className={stylue.logo}>
            <img src={logo} className={stylue.logo_img} alt="logo" />
        </div>
    )
}

export default Logo