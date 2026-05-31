import { type UserConfig } from "vitepress";
import sidebar from "./sidebar";

const themeConfig = {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
        { text: 'főoldalhoz', link: '/' },
    ],

    sidebar,
}

const VitePressConfig: UserConfig = {
    srcDir: "writings",

    title: "pár szöveg",
    description: "Egy pár szöveg",
    themeConfig
};

export default VitePressConfig;