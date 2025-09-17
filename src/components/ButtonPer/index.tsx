import useAuthButtons from "@/hooks/useAuthButtons"
import type { ButtonProps } from "antd"
import type { JSX } from "react"

type ButtonComponent = React.FC<ButtonProps> | JSX.Element | null

interface ButtonPerProps {
    btn: string
    Comp: ButtonComponent
}

const ButtonPer = ({btn, Comp}: ButtonPerProps): JSX.Element | null => {
    const { BUTTONS } = useAuthButtons()

    if (!btn) {
        return <>{Comp}</>
    }
    if (Object.keys(BUTTONS).length == 0) {
        return null
    }
    if (BUTTONS && BUTTONS.includes(btn) && Comp) {
        return <>{Comp}</>
    }
    return null
}

export default ButtonPer
