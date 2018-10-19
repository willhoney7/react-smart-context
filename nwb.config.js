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
    webpack: {
        config(config) {
            config.entry = {
                demo: ['./demo/src/index.js'],
            };

            config.resolve.extensions = config.resolve.extensions || [];
            config.resolve.extensions.push('.js', '.ts', '.tsx', '.css');
            config.module.rules.push({
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            });

            return config;
        },
    },
};
