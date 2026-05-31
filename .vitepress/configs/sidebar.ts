import { type DefaultTheme } from 'vitepress';
import fs from 'node:fs/promises';

let writingsItems: DefaultTheme.SidebarItem[] = [];

try {
    const writingsList = await fs.readdir(`${process.cwd()}/writings`);
    if (writingsList && writingsList.length) {
        writingsItems = writingsList.filter((item) => !item.includes('index')).map((item) => {
            const sanitizedTitle = item.replace(/(\.md)$/, '');
            return {
                text: sanitizedTitle, link: `/${sanitizedTitle}`
            }
        });
    }
} catch (err) {
    //error handling?
}

const sidebar: DefaultTheme.SidebarItem[] = [
    {
        text: 'szövegek',
        items: writingsItems
    }
];

export default sidebar;