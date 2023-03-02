import {ConfigProvider} from "antd";
import {ReactNode} from "react";
import {Toaster} from "react-hot-toast";
import {themeConfig, toastConfig} from "@/configs/ui";

export default function AntdProvider({children}: { children: ReactNode }) {
    return <ConfigProvider
        theme={themeConfig}
    >
        {children}
        <Toaster toastOptions={toastConfig}/>
    </ConfigProvider>
}