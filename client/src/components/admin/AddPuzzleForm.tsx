import { ChangeEvent } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import ApiClient from "../../api/client";
import { addPuzzleFormAtom } from "../../state";
import { AddPuzzleFormState } from "../../state/types";
import { AddPuzzleRequestBody } from "../../../../shared/types";

const AddPuzzleForm = () => {
    const [formState, setFormState] = useRecoilState<AddPuzzleFormState>(addPuzzleFormAtom);
    const resetFormState = useResetRecoilState(addPuzzleFormAtom);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    const formatPuzzleRequestObject = (formState: AddPuzzleFormState): AddPuzzleRequestBody => {
        let { date, centerLetter, letters, pangrams, words } = formState;

        const requestObject: AddPuzzleRequestBody = {
            date: new Date(date),
            centerLetter,
            letters: letters.split(""),
            pangrams: pangrams.split(/\r?\n/),
            words: words.split(/\r?\n/),
        };

        return requestObject;
    };
    
    const submit = async () => {
        const requestObject = formatPuzzleRequestObject(formState);

        // @TODO :: Should display added puzzle on add puzzle form page
        await ApiClient.post('/puzzles', requestObject);

        resetFormState();
    };

    return (
        <StyledAddPuzzleForm>
            <Input 
                type="date"
                name="date"
                value={formState.date} 
                onChange={handleChange} 
            />
            <Input 
                type="text"
                name="centerLetter"
                placeholder="Center letter"
                maxLength={1}
                value={formState.centerLetter}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="letters"
                placeholder="Letters"
                maxLength={6} 
                value={formState.letters}
                onChange={handleChange} 
            />
            <TextArea
                name="pangrams"
                placeholder="Pangrams"
                value={formState.pangrams}
                onChange={handleChange}
            />
            <TextArea 
                name="words"
                value={formState.words}
                placeholder="Words"
                onChange={handleChange} 
            />

            <SubmitButton type="button" onClick={submit}>Add Puzzle</SubmitButton>    
        </StyledAddPuzzleForm>
    );
};

export default AddPuzzleForm;

const StyledAddPuzzleForm = styled.form``;

const Input = styled.input`
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
`;

const TextArea = styled.textarea`
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    margin-right: 0;
`;

const SubmitButton = styled.button`
    margin-top: 5px;
    background-color: lightgray;
    padding: 15px;
    border: none;
`;