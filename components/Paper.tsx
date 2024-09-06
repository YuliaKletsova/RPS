import {useTheme} from '@mui/material';

export const Paper = () => {
    const theme = useTheme();

    return (
        <svg width="55" height="55" viewBox="0 0 1163 1176" stroke={theme.palette.primary.light} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M318.5 92.5L205 52L64.5 321L20.5 488.5L8.5 658L98 710.5L145.5 823.5L269 903L448.5 1084.5L623 1165.5L724.5 974.5L777 988L995.5 957.5L932.5 903L1036 840.5L1154.5 686.5L1081.5 431L1059.5 407.5L1071.5 287L966.5 270L902 206L914 133L587.5 72L469 8H379L318.5 92.5Z"  strokeWidth="30"/>
            <path d="M320 97.5L606 241.5L320 429.5L171 573L20.5 649.5"  strokeWidth="10"/>
            <path d="M530 201L697.5 165.5L875 228"  strokeWidth="10"/>
            <path d="M325 429.5L763.5 307.5L836 295.5L951.5 272"  strokeWidth="10"/>
            <path d="M1061.5 294L902 336L844.5 419L477.5 652.5L420 851"  strokeWidth="15"/>
            <path d="M477.5 652.5L272.5 817L206.5 744"  strokeWidth="10"/>
            <path d="M144 617L174.5 741H301.5"  strokeWidth="0"/>
            <path d="M558.5 759.5L518 873L533 950.5"  strokeWidth="10"/>
            <path d="M624.5 1104.5L596 969.5L777 911.5L851.5 773L816 698.5L829.5 527.5L934.5 504L951.5 460L1053 409"  strokeWidth="10"/>
            <path d="M851.5 771L954.5 851"  strokeWidth="10"/>
            <path d="M916 903L738 971"  strokeWidth="10"/>
        </svg>
    )
}