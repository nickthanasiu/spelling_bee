import { useRecoilState, useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import {
    inputAtom,
    inputWordSelector,
    messageBoxAtom,
    prevWordScoreAtom,
    type ErrorMessage,
    type SuccessMessage,
} from '../state';
import { validateInput } from '../utils/validateInput';
import { useWordValidator } from './useWordValidator';
import { answersById } from '../state/answers';

// @TODO :: Refactor
export const useSubmitWord = () => {

    const inputState= useRecoilValue(inputAtom);

    const inputWord = useRecoilValue(inputWordSelector);

    const clearInput = useResetRecoilState(inputAtom);

    const validateWord = useWordValidator();

    const setPrevWordScore = useSetRecoilState(prevWordScoreAtom);

    const setMessageBoxState = useSetRecoilState(messageBoxAtom);

    const { id } = useParams();

    const setAnswers = useSetRecoilState(answersById(id as string))

    const addAnswer = (newAnswer: string) => {
        setAnswers((answers) => [...answers, newAnswer]);
    };
    

    const hideMessageBox = () => {

        setMessageBoxState({
            visible: false,
            message: '',
            isError: false,
            isPangram: false
        });
    };

    const showMessageBox = (message: any, isError: boolean, isPangram: boolean) => {
        
        setMessageBoxState({
            visible: true,
            message,
            isError,
            isPangram,
        });


        setTimeout(() => {
            hideMessageBox();
        }, 1000);
    };

    const showErrorMessage = (errorMessage: ErrorMessage | "") => {
        showMessageBox(errorMessage, true, false);
    };

    const showSuccessMessage = (successMessage: SuccessMessage, isPangram: boolean) => {
        showMessageBox(successMessage, false, isPangram);
    };

    const getSuccessMessage = (wordLength: number, isPangram?: boolean): SuccessMessage => {
        return isPangram ? 'Pangram!' // Pangram
            : wordLength > 6 ? 'Awesome!' // 7+ letter word
            : wordLength > 4 ? 'Nice!' // 5 or 6 letter word
            : 'Good!'; // 4 letter word
    };

    const calculatePrevWordsScore = (newWord: string, isPangram: boolean): number => {
        if (isPangram) {
            return newWord.length + 7;
        }

        if (newWord.length > 4) {
            return newWord.length;
        }

        return 1;
    };

    const submit = () => {
        // Do not attempt to submit input if empty
        if (!inputState.length) return;

        // Clear input before anything else
        clearInput();

        const inputValidation = validateInput(inputState);

        if (!inputValidation.isValid) {
            showErrorMessage(inputValidation.errorMessage);
            return;
        }

        const wordValidation = validateWord(inputWord);

        if (!wordValidation.isValid) {
            showErrorMessage(wordValidation.errorMessage);
            return;
        }

        // If input is valid and word is valid, we can add the word to foundWordsList
        //updateFoundWordsState(inputWord);
        addAnswer(inputWord);

        // Calculate score and update prevWordScore state
        const prevWordScore = calculatePrevWordsScore(inputWord, wordValidation.isPangram);
        setPrevWordScore(prevWordScore);

        // Use prevWordScore to update totalScore
       // setTotalScore(totalScore + prevWordScore);

        // Generate message
        const successMessage = getSuccessMessage(inputWord.length, wordValidation.isPangram);
        showSuccessMessage(successMessage, wordValidation.isPangram);
    };

    return submit;
};

function useAlternative() {

    const inputWord = useRecoilValue(inputWordSelector);

    const submit = () => {
        if (!inputWord.length) return;


    };

    return submit;
}