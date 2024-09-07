import { createTheme } from '@mui/material';

const getPalette = (isLight: boolean) => {
  return createTheme({
    palette: {
      primary: {
        main: isLight ? '#fff' : '#000',
        light: isLight ? '#000' : '#fff',
        dark: 'rgba(73, 74, 80, 0.4)',
      },
    },
    typography: {
      fontSize: 16,
      button: {
        fontWeight: 600,
        lineHeight: '24px',
      },
      h1: {
        fontSize: 24,
        fontWeight: 800,
        lineHeight: '36px',
      },
    },
    spacing: (factor: number) => `${4 * factor}px`,
  });
};

export const getActiveTheme = (themeMode: 'light' | 'dark') => {
  const { palette, spacing } = getPalette(themeMode === 'light');

  return createTheme({
    typography: {
      fontFamily: [
        'Lato',
        'apple-system',
        'system-ui',
        'Helvetica',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    palette: {
      ...palette,
      mode: themeMode,
      background: {
        default: palette.primary.main,
      },
      text: {
        primary: palette.primary.light,
      },
    },
    components: {
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: spacing(4),
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: spacing(4),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  background: palette.primary.light,
                  borderRadius: spacing(3),
                  padding: spacing(4),
                  color: palette.primary.main,
                },
              },
              {
                props: { variant: 'outlined' },
                style: {
                  borderRadius: spacing(3),
                  borderColor: palette.primary.light,
                  padding: spacing(4),
                  borderWidth: '2px',
                  color: palette.primary.light,

                  '&:hover': {
                    color: palette.primary.light,
                    backgroundColor: palette.primary.dark,
                  },
                },
              },
            ],
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: 'outlined' },
                style: {
                  borderRadius: spacing(3),
                  padding: spacing(4),
                  borderWidth: '1px',
                },
              },
            ],
          },
        },
      },
    },
  });
};
