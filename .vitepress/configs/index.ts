import { fileURLToPath, URL } from "node:url";
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
    base: '/irasok_project',
    srcDir: "writings",
    title: "pár szöveg",
    description: "Egy pár szöveg",
    themeConfig,
    vite: {
        resolve: {
            alias: [
                {
                    //overwritting the default bottom next and prev footer with empty component
                    find: /^.*\/VPDocFooter\.vue$/,
                    replacement: fileURLToPath(
                        new URL('../theme/components/CustomDocFooter.vue', import.meta.url)
                    )
                }
            ]
        }
    }
};

export default VitePressConfig;