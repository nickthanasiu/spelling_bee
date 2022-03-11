import { atom } from 'recoil';

export interface LetterObj {
    letter: string;
    isValid: boolean;
    isCenterLetter: boolean;
}

export const inputState = atom({
    key: 'inputState',
    default: [] as LetterObj[]
})