import { createMuiTheme } from '@material-ui/core/styles';
import Lato from './lato';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: 'rgb(255, 178, 33)',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },

  typography: {
    fontFamily: Lato.fontFamily,
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [Lato],
      },
    },

    MuiTypography: {
      h1: {
        fontSize: 16,
        fontWeight: 400,
        color: '#9f9f91',
        alignSelf: 'flex-start'
      },

      h2: {
        fontSize: 16,
        fontWeight: 400,
        color: 'black',
        alignSelf: 'flex-start'
      },

      subtitle1: {
        fontSize: 22,
        fontWeight: 300,
        color: 'black'
      },

      subtitle2: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
      },

      body1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },

      body2: {
        fontSize: 10,
        fontWeight: 500,
        color: '#333',
      },

      h4: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#333',
      },

      caption: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black !important'
      }
    },

    MuiCircularProgress: {
      colorPrimary: {
        color: '#333'
      }
    },

    MuiPaper: {
      root: {
        background: `white`,
        backgroundColor: 'white',
        padding: '1vw !important',
      }
    },

    MuiFormHelperText: {
      root: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#333',
      }
    },

    MuiFormControlLabel: {
      root: {
        marginLeft: '0 !important'
      },

      label: {
        fontSize: '12px !important',
        fontWeight: 400
      }
    },

    MuiFormLabel: {
      root: {
        color: 'rgb(255, 178, 33)',
        textAlign: 'center'
      }
    },

    MuiPopover: {
      paper: {
        padding: '0 !important'
      }
    },

    MuiButtonBase: {
      root: {
        background: 'transparent'
      }
    },

    MuiIconButton: {
      root: {
        color: '#333 !important'
      },

      label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333'
      }
    },

    MuiToolbar: {
      root: {
        backgroundColor: 'transparent !important',
        padding: '0 !important',
        paddingLeft: '2vh !important',
        paddingRight: '2vh !important',
        paddingTop: '1vh !important',
        height: 'initial !important',
        minHeight: '0 !important'
      }
    },

    MuiTabs: {
      indicator: {
        height: 1,
        background: 'rgb(255, 178, 33)'
      },
    },

    MuiTab: {
      root: {
        minWidth: '0 !important',
        height: 30,
        minHeight: 30,
        textTransform: 'none',
        fontWeight: 400,
        fontSize: 10,
        color: 'black',
        textAlign: 'start',
        '&$selected': {
          color: '#1890ff',
          fontWeight: 'bold',
        },
      },

      textColorPrimary: {
        color: 'black',
      }
    },

    MuiStepper: {
      root: {
        background: 'transparent !important',
        border: 'none !important',
        boxShadow: 'none !important',
        padding: '1vh !important',
        paddingBottom: '0 !important',
        boxSizing: 'border-box',
        margin: 0
      }
    },

    MuiMenuItem: {
      root: {
        fontSize: 16,
        fontWeight: 300,
        color: 'black',
        '&:hover': {
          backgroundColor: 'rgb(54, 54, 57)'
        }
      }
    },

    MuiStepLabel: {
      label: {
        color: '#333 !important'
      }
    },

    MuiSwitch: {
      switchBase: {
        color: 'rgb(44, 44, 47)',
        '& + $track': {
          backgroundColor: 'rgb(44, 44, 47)',
        },

        '&.Mui-checked': {
          color: 'rgb(255, 178, 33) !important',
          '& + $track': {
            backgroundColor: 'rgb(255, 178, 33) !important',
          },
        }
      }
    },

    MuiTextField: {
      root: {
        width: '100%',
        minHeight: 0,
        color: 'red',
        padding: 0,
        fontSize: 14,
        border: 'none !important'
      }
    },

    MuiFilledInput: {
      root: {
        transition: 'all .3s'
      },

      underline: {
        '&&&:before': {
          borderBottom: 'none'
        },
        '&&:after': {
          borderBottom: 'none'
        }
      }
    },

    MuiInput: {
      input: {
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px #ffe7bb inset',
          WebkitTextFillColor: '#333',
        }
      }
    },

    MuiSnackbarContent: {
      root: {
        paddingTop: '0 !important',
        paddingBottom: '0 !important',
        paddingLeft: '1vh',
        paddingRight: '1vh',
        fontSize: '10px',
        fontWeight: 400,
        border: '1px solid transparent',
        backgroundColor: 'rgb(225, 0, 80)',
        borderRadius: 0
      }
    },

    MuiInputLabel: {
      root: {
        color: 'black',
        fontSize: 12,
        lineHeight: '23px',
        zIndex: 100,
        marginLeft: '1vh',
        pointerEvents: 'none',

        '&$focused': { 
          marginLeft: 0,
          lineHeight: '23px !important'
        },

        '&$error': { 
          marginLeft: 0,
        },

        '&.Mui-disabled': {
          color: 'black',
          fontSize: 12,
          lineHeight: '0',
          opacity: 0.7
        },
      },
    },

    MuiSelect: {
      icon: {
        color: '#333',
        marginRight: '1.5vh'
      }
    },

    MuiInputBase: {
      inputAdornedEnd: {
        paddingLeft: '1vh'
      },

      input: {
        '&::placeholder': {
          color: 'black !important',
          opacity: '1 !important',
        },
        paddingLeft: '1vh !important',
        paddingRight: '1vh !important',

        '&::selection' : {
          backgroundColor: 'rgba(#750afc, .7)'
        },
      },

      root: {
        minHeight: 0,
        background: `none`,
        border: 'none',
        fontSize: 25,
        fontWeight: 300,
        color: 'black',
        textTransform: 'none',
        transition: 'all .3s',
        paddingBottom: 3,

        '&:hover' : {
          border: 'none',
          background: `none`,
        },

        '&.Mui-focused': {
          border: 'none',
          background: `none`,
        },

        '&.Mui-disabled': {
          background: `none`,
          border: '1px solid rgba(255, 255, 255, .1)',
          opacity: .7,
        },

        '&.Mui-error': {
          color: '#ff003c',
          border: '1px solid rgba(252, 10, 24, .1)',
          background: `none`
        },
      },
    },

    MuiButton: {
      text: {
        textTransform: 'none',
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'center',

        ['@media (max-width: 767px)']: { 
          alignSelf: 'center !important',
        }
      },

      outlined: {
        textTransform: 'none',
        fontSize: 14,
        paddingTop: '1px',
        paddingBottom: '1px',
        paddingLeft: '6px',
        paddingRight: '6px',
        borderRadius: 'none !important',

        ['@media (max-width: 767px)']: { 
          fontSize: 14
        },

        '&.Mui-disabled': {
          color: 'inherit'
        },
      },

      contained: {
        backgroundColor: 'rgb(255, 178, 33)',
        border: '2px solid rgb(255, 178, 33)',
        borderRadius: 'none !important',
        fontWeight: 500,
        fontSize: 14,
        textTransform: 'none',
        color: 'black !important',
        boxShadow: 'none !important',
        padding: '0',
        transition: 'all .3s',
        margin: 0,

        '&:hover' : {
          backgroundColor: 'rgb(255, 178, 33) !important',
          boxShadow: '0 0 5px rgb(255, 178, 33), 0 0 5px rgb(255, 178, 33) !important'
        },

        '&.Mui-disabled': {
          backgroundColor: '#ffe7bb !important',
          border: '2px solid #ffe7bb',
          color: '#666 !important'
        },

        ['@media (max-width: 767px)']: {
          fontSize: 14
        }
      }
    },
  },
});