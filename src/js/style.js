import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset());

const styles = {
    '@global': {
        body: {
            margin: '20px',
            padding: '20px',
            overflow: 'hidden',
        },
    },
    app: {
    },
    op: {
        padding: '0 5px',
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
