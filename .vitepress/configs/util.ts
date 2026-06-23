import { ExcemptWritingsFromSidebar } from './const';
import { type DefaultTheme } from 'vitepress';
import fs from 'node:fs/promises';

function _sanatizeExtensionFromTitle(title: string): string {
    return title.replace(/\.md$/, '');
}

function _completelysanitizeTitle(title: string): string {
    return title.replace(/_\d{8}(\.md)$/, '');
}

function YYYYMMDDToDate(dateString: string) {
    if (dateString.length !== 8) throw 'Invalid date passed';
    const year = parseFloat(dateString.substring(0, 4));
    const month = parseFloat(dateString.substring(4, 6));
    const day = parseFloat(dateString.substring(6, 8));
    return new Date(year, month - 1, day);
}

export async function getTextList(directoryName: string): Promise<DefaultTheme.SidebarItem[]> {
    let writingsItems: DefaultTheme.SidebarItem[] = [];
    try {
        const writingsList = await fs.readdir(`${process.cwd()}/writings/${directoryName}`);
        writingsList.sort((a: string, b: string) => {
            const aDateString = a.match(/\d{8}/)?.[0];
            if (!aDateString) return 1;

            const bDateString = b.match(/\d{8}/)?.[0];
            if (!bDateString) return -1;

            const bDate = YYYYMMDDToDate(bDateString);
            const aDate = YYYYMMDDToDate(aDateString);
            return bDate.valueOf() - aDate.valueOf();
        });
        if (writingsList && writingsList.length) {
            writingsItems = writingsList.filter((item) => !ExcemptWritingsFromSidebar[_sanatizeExtensionFromTitle(item)]).map((item) => {
                const completelySanitizedTitle = _completelysanitizeTitle(item);
                const extensionSanitizedTitle = _sanatizeExtensionFromTitle(item);
                return {
                    text: completelySanitizedTitle, link: `/${directoryName}/${extensionSanitizedTitle}`
                };
            });
        }
    } catch (err) {
        console.warn(err);
    }
    return writingsItems;
}