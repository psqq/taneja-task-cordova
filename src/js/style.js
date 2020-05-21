import jss from 'jss';
import preset from 'jss-preset-default';
import '@fortawesome/fontawesome-free/js/all';

jss.setup(preset());

const styles = {
    '@global': {
        body: {
            margin: '20px',
            padding: '20px',
            overflow: 'hidden',
        },
        button: {
            margin: '10px',
        }
    },
    app: {
    },
    op: {
        padding: '0 5px',
    },
    expression: {
        'font-size': '20px',
    },
    hidden: {
        display: 'none',
    },
    levels: {
        display: 'flex',
        flexWrap: 'wrap',
        '&>div': {
            display: 'flex',
            flexDirection: 'column',
            width: '100px',
            height: '100px',
            border: '1px solid black',
            margin: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '30px',
            cursor: 'pointer',
            borderRadius: '10px',
        },
        '& .completed': {
            color: 'orange;',
        },
        '&>div.disabled': {
            opacity: '0.5',
            cursor: 'default',
        },
    },
    operations: {
        display: 'flex',
        '& span': {
            display: 'flex',
            width: '40px',
            height: '40px',
            'font-size': '30px',
            'font-weight': 'bold',
            'justify-content': 'center',
            'align-items': 'center',
            border: '1px solid grey',
            margin: '10px',
            cursor: 'pointer',
        },
    },
    answer: {
        'font-size': '30px',
        '&:before': {
            content: '"= "',
        },
    },
};

const { classes } = jss.createStyleSheet(styles).attach();

export default classes;
