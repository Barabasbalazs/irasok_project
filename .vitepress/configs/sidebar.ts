import { type DefaultTheme } from 'vitepress';
import fs from 'node:fs/promises';

function sanitizeTitle(title: string): string {
    return title.replace(/(\.md)$/, '')
}

const excemptWritingsFromSidebar: Record<string, boolean> = {
    index: true,
    leírás: true,
};

let writingsItems: DefaultTheme.SidebarItem[] = [];

try {
    const writingsList = await fs.readdir(`${process.cwd()}/writings`);
    if (writingsList && writingsList.length) {
        writingsItems = writingsList.filter((item) => !excemptWritingsFromSidebar[sanitizeTitle(item)]).map((item) => {
            const sanitizedTitle = sanitizeTitle(item);
            return {
                text: sanitizedTitle, link: `/${sanitizedTitle}`
            }
        });
    }
} catch (err) {
    console.warn(err);
}

const sidebar: DefaultTheme.SidebarItem[] = [
    {
        text: 'szövegek',
        items: writingsItems
    }
];

export default sidebar;