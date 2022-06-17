import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { prevWordScoreAtom } from '../../recoil/atoms/score';

interface IPrevWordScoreProps {
    isError: boolean;
}

function PrevWordScore({ isError }: IPrevWordScoreProps) {
    const prevWordScore = useRecoilValue(prevWordScoreAtom);

    return (
        <>
            {!isError && (
                <StyledPrevWordScore>
                    +{prevWordScore}
                </StyledPrevWordScore>
            )}
        </>
    );
}

export default PrevWordScore;

const StyledPrevWordScore = styled.div`
    font-weight: bold;
    color: #f7da21;
    position: absolute;
    right: -30px;
`;