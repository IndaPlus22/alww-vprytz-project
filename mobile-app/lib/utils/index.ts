import * as FileSystem from 'expo-file-system';
import { icons } from '../constants';

export const checkImage = async (path: string): Promise<string> => {
    try {
        const result = await FileSystem.getInfoAsync(path);

        if (result.exists) {
            return path;
        } else {
            return icons.default_logo;
        }
    } catch (err) {
        return icons.default_logo;
    }
}
