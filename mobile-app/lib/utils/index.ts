import * as FileSystem from 'expo-file-system';

export const checkImage = async (path: string): Promise<string> => {
    try {
        const result = await FileSystem.getInfoAsync(path);

        if (result.exists) {
            return path;
        } else {
            return '/Users/albinww/Programming/Github/testing/expo/mobile-app/lib/assets/icons/KTH-logo.png';
        }
    } catch (err) {
        return '/Users/albinww/Programming/Github/testing/expo/mobile-app/lib/assets/icons/KTH-logo.png';
    }
}
