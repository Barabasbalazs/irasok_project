import { ExcemptWritingsFromSidebar } from './const';
import { type DefaultTheme } from 'vitepress';
import fs from 'node:fs/promises';

function _sanitizeTitle(title: string): string {
    return title.replace(/_\d{8}(\.md)$/, '')
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
            const aDateString = a.match(/d{8}/)?.[0];
            if (!aDateString) return -1;

            const bDateString = b.match(/d{8}/)?.[0];
            if (!bDateString) return 1;

            const bDate = new Date(bDateString);
            const aDate = new Date(aDateString);
            return aDate.valueOf() - bDate.valueOf();
        });

        if (writingsList && writingsList.length) {
            writingsItems = writingsList.filter((item) => !ExcemptWritingsFromSidebar[_sanitizeTitle(item)]).map((item) => {
                const sanitizedTitle = _sanitizeTitle(item);
                return {
                    text: sanitizedTitle, link: `/${directoryName}/${sanitizedTitle}`
                }
            });
        }
    } catch (err) {
        console.warn(err);
    }
    return writingsItems;
}