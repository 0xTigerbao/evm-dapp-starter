import {ThemeConfig} from "antd/es/config-provider/context";
import {DefaultToastOptions} from "react-hot-toast";

export const themeConfig: ThemeConfig = {
    token: {
        colorPrimary: '#00b96b'
    }
}

export const toastConfig: DefaultToastOptions = {
    className: "",
    position: "top-right"
}