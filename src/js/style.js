import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset());

const styles = {
    '@global': {
        body: {
            margin: 0,
            padding: 0,
            overflow: 'hidden',
        },
    },
};

const { classes } = jss.createStyleSheet(styles).attach();

export default classes;
