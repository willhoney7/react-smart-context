module.exports = {
    type: 'react-component',
    npm: {
        esModules: true,
        umd: {
            global: 'ReactContextStore',
            externals: {
                react: 'React',
            },
        },
    },
};
