import {useTheme} from '@mui/material';

export const Scissors = () => {
    const theme = useTheme();

    return (
        <svg width="55" height="55" viewBox='0 0 48 48'>
            <g>
                <path fill={theme.palette.primary.dark}  stroke={theme.palette.primary.light} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" id="path16717" d="m34.174309,1.625c0.211952,0.06854 0.417263,0.14466 0.623981,0.2175c0.651421,2.197 3.67149,4.41872 2.52306,6.60663c-3.82584,6.38039 -7.624331,12.845441 -11.421591,19.276139c-0.745749,0.1469 -1.49803,0.226912 -2.25177,0.24469c-1.58639,0.040211 -3.21493,-0.194489 -4.72056,-0.73407c5.050871,-8.55127 10.10387,-17.121409 15.24688,-25.610889z"/>
                <polygon fill={theme.palette.primary.light} stroke={theme.palette.primary.light} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" points="24.5 26.6794 22.1534 30.4429 17.5457 35.0723 16.0891 31.4427 19.7785 25.5 24.5 26.6794" id="polygon45129"/>
                <path fill="url(#linearGradient16974)" stroke={theme.palette.primary.light} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" id="polygon45097" d="m12.9601,1.625c-0.20813,0.06854 -0.40975,0.14466 -0.61275,0.2175c-0.63968,2.197 -3.60536,4.41872 -2.47762,6.60663c3.75695,6.38039 7.48703,12.845441 11.21591,19.276139c0.732321,0.1469 1.47105,0.226912 2.21121,0.24469c1.557829,0.040211 3.15704,-0.194489 4.635559,-0.73407c-4.959919,-8.55127 -9.921919,-17.121409 -14.972309,-25.610889z"/>
                <path fill={theme.palette.primary.light} fillRule="nonzero" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" markerStart="none" markerMid="none" markerEnd="none" strokeMiterlimit="4" strokeDashoffset="0" d="m24.015438,24.017473a0.962774,0.98253 0 1 1 -1.925539,0a0.962774,0.98253 0 1 1 1.925539,0z" id="path16731"/>
                <path fill={theme.palette.primary.light} stroke={theme.palette.primary.light} d="m17.70039,30.28693c3.23501,1.72665 3.49584,6.612919 0.57795,10.91436c-2.917859,4.303959 -7.90449,6.39518 -11.140959,4.676128c-3.2365,-1.72665 -3.49583,-6.61039 -0.57794,-10.911819c2.91637,-4.30143 7.90449,-6.392658 11.14095,-4.678669zm-1.85512,2.742149c-1.43653,-0.76363 -4.50746,0.54052 -6.46634,3.434032c-1.96291,2.893497 -1.8229,5.913517 -0.38773,6.674839c1.435149,0.76823 4.50878,-0.54052 6.467669,-3.434021c1.96426,-2.893509 1.822889,-5.911221 0.3864,-6.67485z" id="path45138"/>
                <polygon fill={theme.palette.primary.light} stroke={theme.palette.primary.light} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" points="23.1199 27.7344 25.4542 31.6651 30.0466 36.5 31.4996 32.7092 27.8239 26.5027 23.1199 27.7344" id="polygon45101"/>
                <path fill={theme.palette.primary.light} stroke={theme.palette.primary.light} id="path11967" d="m30.33176,30.28693c-3.23501,1.72665 -3.495831,6.612919 -0.57794,10.91436c2.91786,4.303959 7.90449,6.39518 11.140959,4.676128c3.2365,-1.72665 3.495831,-6.61039 0.577942,-10.911819c-2.91637,-4.30143 -7.904491,-6.392658 -11.140961,-4.678669zm1.855129,2.742149c1.43652,-0.76363 4.507462,0.54052 6.466339,3.434032c1.96291,2.893497 1.822903,5.913517 0.387722,6.674839c-1.435143,0.76823 -4.508781,-0.54052 -6.467659,-3.434021c-1.964262,-2.893509 -1.822903,-5.911221 -0.386402,-6.67485z"/>
            </g>
        </svg>
    )
}