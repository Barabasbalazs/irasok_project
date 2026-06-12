import { getTextList } from './util';
import { type DefaultTheme } from 'vitepress';

const textItems = await getTextList('szövegek');
const haikuItems = await getTextList('haikuk');

const Sidebar: DefaultTheme.SidebarItem[] = [
    {
        text: 'haikuk',
        items: haikuItems
    },
    {
        text: 'szövegek',
        items: textItems
    },
];

export default Sidebar;